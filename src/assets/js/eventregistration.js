import QRCode from 'qrcode';
import { proto } from './lib/trace_location_pb';
import { encode } from 'uint8-to-base64';
import dayjs from 'dayjs';
import Cleave from 'cleave.js';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";
import 'regenerator-runtime/runtime';
import $ from 'jquery';
import 'slick-carousel';
import lang_en from '../../data/eventregistration.json';
import lang_de from '../../data/eventregistration_de.json';
import './pdf-font-medium'
import './pdf-font-extrabold'

const backgroundImage = new Image();
backgroundImage.src = '/assets/img/pt-poster-1.0.0.png';

const backgroundImageWithText = new Image();
backgroundImageWithText.src = '/assets/img/pt-poster-withtext-1.0.0.png';

const PDF = {single: null, multi: null};

const QR_LIST = [];
const QR_LIST_PREVIEW = [];

function isValidDate(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

function dateTimeToUnixTimestamp(date, time) {
  return new Date(`${date}T${time}`).getTime() / 1000;
}

if (document.getElementById('qrform')) {
  UpdateQRForm();

  new Cleave('#starttime-date', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
  });

  new Cleave('#starttime-time', {
    time: true,
    timePattern: ['h', 'm']
  });

  new Cleave('#endtime-date', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
  });

  new Cleave('#endtime-time', {
    time: true,
    timePattern: ['h', 'm']
  });
}

document.getElementById('locationtype').addEventListener('input', function (e) {
  UpdateQRForm();
});

function UpdateQRForm() {
  let locationtype = +document.getElementById('locationtype').value;
  if (locationtype && (locationtype >= 9 || locationtype === 2)) {
    document.getElementById('event-duration').classList.remove('d-none');
  } else {
    document.getElementById('event-duration').classList.add('d-none');
  }
}

document.getElementById('qrform').addEventListener('change', function (e) {
  document.getElementById('eventplaceholder').classList.remove('d-none');
  document.getElementById('eventqrcode').classList.add('d-none');
  document.getElementById('printCode').disabled = true;
  document.getElementById('downloadCode').disabled = true;
  document.getElementById('generateQR').disabled = false;
});

document.getElementById('qrform-multi').addEventListener('change', function(e) {
  document.getElementById('generateMultiQR').disabled = false;
});

document.getElementById('generateQR').addEventListener('click', async function (e) {
  e.preventDefault();

  if (ValidateQRForm()) {
    let grid = document.getElementById("pageLayout").value;
    let description = document.getElementById('description').value;
    let address = document.getElementById('address').value;
    let defaultcheckinlengthHours = +document.getElementById('defaultcheckinlength-hours').value;
    let defaultcheckinlengthMinutes = +document.getElementById('defaultcheckinlength-minutes').value;
    let locationtype = +document.getElementById('locationtype').value;
    let startdate = document.getElementById('starttime-date').value.split('.').reverse().join('-');
    let starttime = document.getElementById('starttime-time').value;
    let enddate = document.getElementById('endtime-date').value.split('.').reverse().join('-');
    let endtime = document.getElementById('endtime-time').value;
    
    let canvas = document.getElementById('eventqrcode');
    let ctx = canvas.getContext('2d');

    const qrPreview = await GenerateQRCode(true, grid, description.replace(/\s+/g, ' '), address.replace(/\s+/g, ' '), defaultcheckinlengthMinutes, locationtype, startdate, enddate, starttime, endtime, false, defaultcheckinlengthHours);

    const qr = await GenerateQRCode(false, grid, description, address, defaultcheckinlengthMinutes, locationtype, startdate, enddate, starttime, endtime, false, defaultcheckinlengthHours);

    ctx.width = 1654;
    ctx.height = 2339;
    canvas.width = 1654;
    canvas.height = 2339;
    canvas.style.maxWidth = "100%";

    ctx.drawImage(qrPreview, 0, 0);

    PrintLayout(qr)

    document.getElementById('printCode').disabled = false;
    // Active download button
    document.getElementById('downloadCode').disabled = false;
    document.getElementById('eventplaceholder').classList.add('d-none');
     
    //$("#eventqrcode").attr("src", PDF.single.output('datauristring')).removeClass("d-none");

    canvas.classList.remove('d-none');   
    // Disable ceate button until qrform changes
    document.getElementById('generateQR').disabled = true;

  }
});

document.getElementById('generateMultiQR').addEventListener('click', function (e) {
  e.preventDefault();
  if (ValidateMultiQRForm()) {
    parseCsv(document.getElementById('csvFile').files[0]).then(function (result) {
      let json = result.data;
      //Remove last empty line
      if (json[json.length] === []) json.pop();
      if(json.length == 0) document.getElementById('qr-error-filewithnodata').style.display = 'block';
      else if (!checkCSVHeaders(json)) document.getElementById('qr-error-wrongfileheaders').style.display = 'block';
      else if (json.length < 1) document.getElementById('qr-error-filewithnodata').style.display = 'block';
      else if (json.length > 101)  document.getElementById('qr-error-fileoverloaded').style.display = 'block';
      else {
        document.getElementById('generateMultiQR').disabled = true;
        document.getElementById("modal").classList.remove('d-none');
        setTimeout(() => {          
          GenerateMultiQRCode(json).then(function (status) {
            if (status) {             
              printQRsOnPage().then(function (data) {
                //let info = document.getElementById("qrsGeneratedInfo");
                //let text = info.textContent;
                //text = text.replace('#', data.pages);
                //text = text.replace('$', data.totalQR);
                //info.textContent = text;
                //info.classList.remove('d-none');

                document.getElementById("modal").classList.add('d-none');
                document.getElementById('generateMultiQR').disabled = false;
                printPages(data)

                //$("#multieventqrcode").attr("src", PDF.multi.output('datauristring')).removeClass("d-none");
              });
            }              
          });
        },100)
      }  
    });
  }
});

document.getElementById('downloadCode').addEventListener('click', function (e) {
  e.preventDefault();

  let today = new Date();
  let date = today.toISOString().slice(0, 10);
  let time = ("0" + today.getHours()).slice(-2) + "-" + ("0" + today.getMinutes()).slice(-2)

  PDF.single.save(`Event_QR_Codes_Date_${date}_Time_${time}`);
});

document.getElementById('printCode').addEventListener('click', function (e) {
  e.preventDefault();

  PDF.single.autoPrint();
  let blob = PDF.single.output("blob");
  window.open(URL.createObjectURL(blob), '_blank');

});

document.getElementById('eventqrcode').addEventListener('click', function (e) {
  let elem = document.getElementById('eventqrcode');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
  var requestMethod = 
  elem.requestFullScreen ||
  elem.webkitRequestFullscreen ||
  elem.mozRequestFullScreen ||
  elem.msRequestFullscreen;

  if( requestMethod ) {
    requestMethod.apply(elem);
  }
});

document.getElementById('downloadMultiCode').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById("modal").classList.remove('d-none'); 
  setTimeout(() => {
    let today = new Date();
    let date = today.toISOString().slice(0, 10);
    let time = ("0" + today.getHours()).slice(-2) + "-" + ("0" + today.getMinutes()).slice(-2)

    PDF.multi.save(`Event_QR_Codes_Date_${date}_Time_${time}`);
    document.getElementById("modal").classList.add('d-none');
  }, 500)

});

document.getElementById('printMultiCode').addEventListener('click', function (e) {
  e.preventDefault();

  PDF.multi.autoPrint();
  let blob = PDF.multi.output("blob");
  window.open(URL.createObjectURL(blob), '_blank');
});

function ValidateQRForm() {
  let errors = 0;
  let errorFocus = false;

  let errorMessages = document.querySelectorAll('.invalid-feedback');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.display = 'none';
  }

  let locationtype = document.getElementById('locationtype').value;
  if (!locationtype.length) {
    document.getElementById('qr-error-locationtyperequired').style.display = 'block';
    document.getElementById('locationtype').focus();
    errorFocus = true;
    errors++;
  }

  let description = document.getElementById('description').value;
  if (!description.length) {
    document.getElementById('qr-error-descriptionrequired').style.display = 'block';
    if (!errorFocus) {
      document.getElementById('description').focus();
      errorFocus = true;
    }
    errors++;
  } else if (description.length > 100) {
    document.getElementById('qr-error-descriptionmax').style.display = 'block';
    if (!errorFocus) {
      document.getElementById('description').focus();
      errorFocus = true;
    }
    errors++;
  }

  let address = document.getElementById('address').value;
  if (!address.length) {
    document.getElementById('qr-error-addressrequired').style.display = 'block';
    if (!errorFocus) {
      document.getElementById('address').focus();
      errorFocus = true;
    }
    errors++;
  } else if (address.length > 100) {
    document.getElementById('qr-error-addressmax').style.display = 'block';
    if (!errorFocus) {
      document.getElementById('address').focus();
      errorFocus = true;
    }
    errors++;
  }

  let defaultcheckinlengthHours = +document.getElementById('defaultcheckinlength-hours').value;
  let defaultcheckinlengthMinutes = +document.getElementById('defaultcheckinlength-minutes').value;
  if (!defaultcheckinlengthMinutes && !defaultcheckinlengthHours) {
    document.getElementById('qr-error-defaultcheckinlengthrequired').style.display = 'block';
    if (!errorFocus) {
      document.getElementById('defaultcheckinlength-hours').focus();
      errorFocus = true;
    }
    errors++;
  }

  if (locationtype >= 9 || locationtype === 2) {
    let timeReg = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    let dateReg = /^\d{2}.\d{2}.\d{4}$/

    let startdate = document.getElementById('starttime-date').value;
    let starttime = document.getElementById('starttime-time').value;
    if (!starttime || !startdate) {
      document.getElementById('qr-error-starttimerequired').style.display = 'block';
      if (!errorFocus) {
        if (!startdate) {
          document.getElementById('starttime-date').focus();
        } else {
          document.getElementById('starttime-time').focus();
        }
        errorFocus = true;
      }
      errors++;
    } else {
      if (!dateReg.test(startdate) || !dayjs(startdate.split(".").reverse().join("-")).isValid()) {
        document.getElementById('qr-error-starttimeinvaliddate').style.display = 'block';
        if (!errorFocus) {
          document.getElementById('starttime-date').focus();
          errorFocus = true;
        }
        errors++;
      }

      if (!timeReg.test(starttime)) {
        document.getElementById('qr-error-starttimeinvalidtime').style.display = 'block';
        if (!errorFocus) {
          document.getElementById('starttime-time').focus();
          errorFocus = true;
        }
        errors++;
      }
    }

    let enddate = document.getElementById('endtime-date').value;
    let endtime = document.getElementById('endtime-time').value;
    if (!endtime || !enddate) {
      document.getElementById('qr-error-endtimerequired').style.display = 'block';
      if (!errorFocus) {
        if (!enddate) {
          document.getElementById('endtime-date').focus();
        } else {
          document.getElementById('endtime-time').focus();
        }
        errorFocus = true;
      }
      errors++;
    } else {
      if (!dateReg.test(enddate) || !dayjs(enddate.split(".").reverse().join("-")).isValid()) {
        document.getElementById('qr-error-endtimeinvaliddate').style.display = 'block';
        if (!errorFocus) {
          document.getElementById('endtime-date').focus();
          errorFocus = true;
        }
        errors++;
      }

      if (!timeReg.test(endtime)) {
        document.getElementById('qr-error-endtimeinvalidtime').style.display = 'block';
        if (!errorFocus) {
          document.getElementById('endtome-time').focus();
          errorFocus = true;
        }
        errors++;
      }
    }
  }

  return errors === 0;
}

function ValidateMultiQRForm() {
  let errors = 0;

  let errorMessages = document.querySelectorAll('.invalid-feedback');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.display = 'none';
  }

  let fileExtension = document.getElementById('csvFile').value.split('.').pop();
  if (!fileExtension.length) {
    document.getElementById('qr-error-filerequired').style.display = 'block';
    errors++;
  } else {
    if (fileExtension !== 'csv') {
      document.getElementById('qr-error-wrongfileextension').style.display = 'block';
      errors++;
    }
  }
  return errors === 0;
}

async function parseCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => {
        return value.trim();
      },
      complete: (results) => {
        return resolve(results);
      },
      error: (error) => {
        return reject(error);
      },
    });
  });
}

function checkCSVHeaders(json) {
  if(json.length === 0) json.push([])
  let HEADERS = ["filepath", "description", "address", "startdate", "enddate", "type", "defaultcheckinlengthinminutes"];
  return (Object.keys(json[0]).sort().join(',') === HEADERS.sort().join(','))
}

//Return canvas with QR code and text
async function GenerateQRCode(isPreview, grid, description, address, defaultcheckinlengthMinutes, locationType, startdate, enddate, starttime, endtime, list, defaultcheckinlengthHours=false) {
  return new Promise((resolve) => {
  try {
    let validCheckinLength = !Number.isNaN(parseInt(defaultcheckinlengthMinutes)) && defaultcheckinlengthMinutes !== "" && defaultcheckinlengthMinutes !== null;
    let validLocation = !Number.isNaN(parseInt(locationType));
    let validStartDate, validEndDate;
    let today = new Date();
    let date = today.toISOString().slice(0, 10);
    let time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2)
    if (validLocation && (locationType >= 9 && locationType <= 12 || locationType === 2)) {
      validStartDate = new Date(startdate).getTime() > 0 && startdate !== "" && startdate !== null;
      validEndDate = new Date(enddate).getTime() > 0 && enddate !== "" && enddate !== null;
      if (!validStartDate || !validEndDate) {
        validLocation = false
      }

      let errorFocus = false;
      if (Date.parse(startdate+'T'+starttime) > Date.parse(enddate+'T'+endtime)) {
        validLocation = false;
        document.getElementById('qr-error-endtimebeforestarttime').style.display = 'block';
        document.getElementById('endtime-date').focus();
        errorFocus = true;
      }
      if (startdate < date || (startdate === date && (starttime <= time))) {
        validLocation = false;
        document.getElementById('qr-error-olddate').style.display = 'block';
        if (!errorFocus) {
          document.getElementById('starttime-date').focus();
        }
      }
    }
    
    let validDescription = description !== "" && description !== null;
    let validAddress = address !== "" && address !== null;

    if (validCheckinLength && validLocation && validDescription && validAddress) {
      let locationData = new proto.CWALocationData();
      let col = grid.split('x')[0];
      locationData.setVersion(1);
      locationData.setType(locationType);
      locationData.setDefaultcheckinlengthinminutes(defaultcheckinlengthHours != false ? defaultcheckinlengthHours * 60 + defaultcheckinlengthMinutes : defaultcheckinlengthMinutes);
      let crowdNotifierData = new proto.CrowdNotifierData();
      crowdNotifierData.setVersion(1);
      crowdNotifierData.setPublickey('gwLMzE153tQwAOf2MZoUXXfzWTdlSpfS99iZffmcmxOG9njSK4RTimFOFwDh6t0Tyw8XR01ugDYjtuKwjjuK49Oh83FWct6XpefPi9Skjxvvz53i9gaMmUEc96pbtoaA');
      let seed = new Uint8Array(16);
      crypto.getRandomValues(seed);
      crowdNotifierData.setCryptographicseed(seed);
      let traceLocation = new proto.TraceLocation();
      traceLocation.setVersion(1);
      traceLocation.setDescription(description);
      traceLocation.setAddress(address);
      if (locationType >= 9 || locationType === 2) {
        traceLocation.setStarttimestamp(dateTimeToUnixTimestamp(startdate, starttime));
        traceLocation.setEndtimestamp(dateTimeToUnixTimestamp(enddate, endtime));
      }
      let payload = new proto.QRCodePayload();
      payload.setLocationdata(traceLocation);
      payload.setCrowdnotifierdata(crowdNotifierData);
      payload.setVendordata(locationData.serializeBinary());
      payload.setVersion(1);
      let qrContent = encode(payload.serializeBinary()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      let qr = document.createElement("canvas");
      let canvas = document.createElement("canvas");
      let canvasPreview = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
      let ctxPreview = canvasPreview.getContext('2d');
      QRCode.toCanvas(qr, 'https://e.coronawarn.app?v=1#' + qrContent, {
        margin: 0,
        width: 1100
      }, function (err) {
        if (err) {
          console.error(err);
          return resolve(false);
        }

        ctx.width = 1654;
        ctx.height = 2339;
        canvas.width = 1654;
        canvas.height = 2339;
        canvas.style.maxWidth = "100%"
        if(isPreview) {
          ctx.drawImage(backgroundImageWithText, 0, 0);
        } else {
          ctx.drawImage(backgroundImage, 0, 0);
        }
        ctx.drawImage(qr, 275, 230);

        ctxPreview.width = 1654;
        ctxPreview.height = 2339;
        canvasPreview.width = 1654;
        canvasPreview.height = 2339;
        canvasPreview.style.maxWidth = "100%"
        ctxPreview.drawImage(backgroundImageWithText, 0, 0);
        ctxPreview.drawImage(qr, 275, 230);

        let fontSize = (30+parseInt(col))*2;
        ctxPreview.font = fontSize+"px sans-serif";
        ctxPreview.fillStyle = "black";
        ctxPreview.fillText(description, 225, 1460);
        ctxPreview.fillText(address, 225, 1460 + 50 + (fontSize/2));

        if(isPreview) {
          ctx.font = fontSize+"px sans-serif";
          ctx.fillStyle = "black";
          ctx.fillText(description, 225, 1460);
          ctx.fillText(address, 225, 1460 + 50 + (fontSize/2));
        }

        if(list) {
          QR_LIST.push({QR: canvas, description: description, address: address});
          QR_LIST_PREVIEW.push(canvasPreview);
        } else {
          resolve(canvas);
        } 
      });
      document.getElementById('eventqrcode').style.visibility='visible';
    } else {
      resolve(false);
    }
  } catch(err) {
    return resolve(false);
  }
  })
}

function PrintLayout(QR) {
  let title = ["CHECKEN SIE EIN.", "STOPPEN SIE DAS VIRUS."]
  let body = ["Nutzen Sie die Corona-Warn-App! Scannen Sie den QR-Code und tragen", "Sie aktiv dazu bei, mögliche Infektionsketten schnell und effektiv", "zu durchbrechen."]

  let description = document.getElementById('description').value;
  let address = document.getElementById('address').value;


  let grid = document.getElementById("pageLayout").value.split('x')
  let col, row;
  col = parseInt(grid[0]);
  row = parseInt(grid[1]);

  let portrait = col == row;
  const doc = new jsPDF({
    orientation: portrait ? "portrait" : "landscape",
  });

  let width = doc.internal.pageSize.getWidth();
  let height = doc.internal.pageSize.getHeight();
  let headFontSize, titleFontSize,bodyFontSize, lineHeightTitle, lineHeightBody;

  switch(document.getElementById("pageLayout").value) {
    case "1x1":
      headFontSize = 14;
      titleFontSize = 30;
      bodyFontSize = 18.5;
      lineHeightTitle = 1.3;
      lineHeightBody = 1.2;
      break;
    case "2x1":
      headFontSize = 13;
      titleFontSize = 21.5;
      bodyFontSize = 13.1;
      lineHeightTitle = 1.3;
      lineHeightBody = 1.2;
      break;
    case "2x2":
      headFontSize = 10;
      titleFontSize = 15.3;
      bodyFontSize = 9.3;
      lineHeightTitle = 1.2;
      lineHeightBody = 1.1;
      break;
    case "3x3":
      headFontSize = 6;
      titleFontSize = 10;
      bodyFontSize = 6.2;
      lineHeightTitle = 1.3;
      lineHeightBody = 1.2;
      break;
    case "4x2":
      headFontSize = 6;
      titleFontSize = 10.7;
      bodyFontSize = 6.5;
      lineHeightTitle = 1.3;
      lineHeightBody = 1.2;
      break;
    case "4x4":
      headFontSize = 5;
      titleFontSize = 7.7;
      bodyFontSize = 4.7;
      lineHeightTitle = 1.2;
      lineHeightBody = 1.2;
      break;
    case "5x5":
      headFontSize = 4;
      titleFontSize = 6;
      bodyFontSize = 3.7;
      lineHeightTitle = 1.3;
      lineHeightBody = 1.1;
      break;
    case "6x3":
      headFontSize = 5;
      titleFontSize = 7.3;
      bodyFontSize = 4.4;
      lineHeightTitle = 1.2;
      lineHeightBody = 1.2;
      break;
  }

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      doc.addImage(QR, 'PNG', (width / col) * c, (height / row) * r, width / col, height / row, "", 'FAST');

      doc.setFontSize(headFontSize)
      doc.setFont("helvetica");
      doc.setTextColor('#000000');
      doc.setLineHeightFactor(1);
      doc.text([description, address], ((width/col) * c) + (width / col) * 0.1395, ((height/row) * r) + (height / row) * 0.6242)

      doc.setFontSize(titleFontSize);
      doc.setFont("futura-condensed-extrabold_bigfontsite.com");
      doc.setTextColor('#007099');
      doc.setLineHeightFactor(lineHeightTitle);
      doc.text(title, ((width/col) * c) + (width / col) * 0.1295, ((height/row) * r) + (height / row) * 0.70);

      doc.setFontSize(bodyFontSize);
      doc.setFont("futura-condensedmedium_bigfontsite.com");
      doc.setTextColor('#404040');
      doc.setLineHeightFactor(lineHeightBody);
      doc.text(body, ((width/col) * c) + (width / col) * 0.1295, ((height/row) * r) + (height / row) * 0.785);
    }
  }
  PDF.single = doc;
}

async function GenerateMultiQRCode(data) {
  return new Promise((resolve) => {
    let grid = document.getElementById("pageTemplate").value
    QR_LIST.splice(0, QR_LIST.length);
    for (const qr of data) {
      GenerateQRCode(false, grid, qr.description.replace(/\s+/g, ' '), qr.address.replace(/\s+/g, ' '), qr.defaultcheckinlengthinminutes, qr.type, qr.startdate, qr.enddate, qr.starttime, qr.endtime, true);
    }
    if (QR_LIST.length !== data.length) {
      document.getElementById('generateMultiQR').disabled = false;
      document.getElementById("modal").classList.add('d-none');
      document.getElementById('qr-error-wrongfileformatfields').style.display = 'block';
      return resolve(false);
    }
    return resolve(true);
  })
}

async function printQRsOnPage() {
  return new Promise((resolve) => {
    let title = ["CHECKEN SIE EIN.", "STOPPEN SIE DAS VIRUS."]
    let body = ["Nutzen Sie die Corona-Warn-App! Scannen Sie den QR-Code und tragen", "Sie aktiv dazu bei, mögliche Infektionsketten schnell und effektiv", "zu durchbrechen."]

    let grid = document.getElementById("pageTemplate").value.split('x')
    let col, row;
    col = grid[0];
    row = grid[1];
    let pageCapacity = row * col;
    let pagesNeeded = Math.ceil(QR_LIST.length / pageCapacity);
    let pages = [];

    let container = document.getElementsByClassName("slick-track")[0];
    container.innerHTML = '';

    let portrait = col == row;
    const doc = new jsPDF({
      orientation: portrait ? "portrait" : "landscape",
    });

    let width = doc.internal.pageSize.getWidth();
    let height = doc.internal.pageSize.getHeight();
    let headFontSize, titleFontSize,bodyFontSize, lineHeightTitle, lineHeightBody;

    //Reset generated info under carousel
    let info = document.getElementById("qrsGeneratedInfo");
    switch (document.documentElement.lang) {
      case 'en':
        info.textContent = lang_en['section-main'].qrsGeneratedInfo;
        break;
      case 'de':
        info.textContent = lang_de['section-main'].qrsGeneratedInfo;
        break;
      default:
        info.textContent = lang_en['section-main'].qrsGeneratedInfo;
        break;
    }

    switch(document.getElementById("pageTemplate").value) {
      case "1x1":
        headFontSize = 14;
        titleFontSize = 30;
        bodyFontSize = 18.5;
        lineHeightTitle = 1.3;
        lineHeightBody = 1.2;
        break;
      case "2x1":
        headFontSize = 13;
        titleFontSize = 21.5;
        bodyFontSize = 13.1;
        lineHeightTitle = 1.3;
        lineHeightBody = 1.2;
        break;
      case "2x2":
        headFontSize = 10;
        titleFontSize = 15.3;
        bodyFontSize = 9.3;
        lineHeightTitle = 1.2;
        lineHeightBody = 1.1;
        break;
      case "3x3":
        headFontSize = 6;
        titleFontSize = 10;
        bodyFontSize = 6.2;
        lineHeightTitle = 1.3;
        lineHeightBody = 1.2;
        break;
      case "4x2":
        headFontSize = 6;
        titleFontSize = 10.7;
        bodyFontSize = 6.5;
        lineHeightTitle = 1.3;
        lineHeightBody = 1.2;
        break;
      case "4x4":
        headFontSize = 5;
        titleFontSize = 7.7;
        bodyFontSize = 4.7;
        lineHeightTitle = 1.2;
        lineHeightBody = 1.2;
        break;
      case "5x5":
        headFontSize = 4;
        titleFontSize = 6;
        bodyFontSize = 3.7;
        lineHeightTitle = 1.3;
        lineHeightBody = 1.1;
        break;
      case "6x3":
        headFontSize = 5;
        titleFontSize = 7.3;
        bodyFontSize = 4.4;
        lineHeightTitle = 1.2;
        lineHeightBody = 1.2;
        break;
    }

    // website preview
    let i = 0;
    for (let pagem = 0; pagem < pagesNeeded; pagem++) {
      if (i < QR_LIST.length) {
        let canvas = document.createElement("canvas");
        canvas.className = "eventqr-preview";
        let ctx = canvas.getContext('2d');
        let resolution = Math.sqrt(col * row) / 2;
        let width = 1654 * resolution;
        let height = 2339 * resolution;
        if (col == row) {
          ctx.width = width;
          ctx.height = height;
          canvas.width = width;
          canvas.height = height;
          canvas.style.maxWidth = "100%";
        } else {
          ctx.width = height;
          ctx.height = width;
          canvas.width = height;
          canvas.height = width;
          canvas.style.maxWidth = "100%";
        }

        for (let r = 0; r < row; r++) {
          for (let c = 0; c < col; c++) {
            if (i < QR_LIST.length) {
              ctx.drawImage(QR_LIST_PREVIEW[i], (canvas.width / col) * c, (canvas.height / row) * r, canvas.width / col, canvas.height / row);
              i++;
            }
          }
        }

        if (col != row) {
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
          ctx.rotate(-Math.PI / 2);
        }
        pages.push(canvas)
      }
    }


    // //Start to print depend of the layout selected
    i = 0;
    for (let pagem = 0; pagem < pagesNeeded; pagem++) { 
      for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
          if (i < QR_LIST.length) {
            // new accessibility pdf code
            doc.addImage(QR_LIST[i].QR, 'PNG', (width / col) * c, (height / row) * r, width / col, height / row, "", 'FAST');

            doc.setFontSize(headFontSize)
            doc.setFont("helvetica");
            doc.setTextColor('#000000');
            doc.setLineHeightFactor(1);
            doc.text([QR_LIST[i].description, QR_LIST[i].address], ((width/col) * c) + (width / col) * 0.1395, ((height/row) * r) + (height / row) * 0.6242)

            doc.setFontSize(titleFontSize);
            doc.setFont("futura-condensed-extrabold_bigfontsite.com");
            doc.setTextColor('#007099');
            doc.setLineHeightFactor(lineHeightTitle);
            doc.text(title, ((width/col) * c) + (width / col) * 0.1295, ((height/row) * r) + (height / row) * 0.70);

            doc.setFontSize(bodyFontSize);
            doc.setFont("futura-condensedmedium_bigfontsite.com");
            doc.setTextColor('#404040');
            doc.setLineHeightFactor(lineHeightBody);
            doc.text(body, ((width/col) * c) + (width / col) * 0.1295, ((height/row) * r) + (height / row) * 0.785);
            i++;
          }
        }
      }
      if(pagem < pagesNeeded-1) doc.addPage();
    }
    PDF.multi = doc;
    document.getElementById('printMultiCode').disabled = false;
    // Active download button
    document.getElementById('downloadMultiCode').disabled = false;
    document.getElementById('multieventplaceholder').classList.add('d-none');

    let data = { "pages": pages, "container": container, "totalQR": QR_LIST.length }
    
    return resolve(data);
  });
}

async function printPages(data) {
  data.pages.forEach((printed) => {
    $('.qr-slider').slick('slickAdd', printed);
  })

  let info = document.getElementById("qrsGeneratedInfo");
  let text = info.textContent;
  text = text.replace('#', data.pages.length);
  text = text.replace('$', data.totalQR);
  info.textContent = text;
  let container = document.getElementById("qrContainer")
  container.classList.remove('d-none');
  info.classList.remove('d-none');

  let infoContainer = document.getElementById("qrsGeneratedInfoContainer");
  if (data.pages.length == 1) {
    infoContainer.classList.remove('mt-4');
    container.classList.remove('slick-dotted');
  }
  else {
    infoContainer.classList.add('mt-4');
    container.classList.add('slick-dotted');

    let slider = $(".qr-slider");

    function loadSliderDotClasses(stickSlider) {
      let dot = stickSlider[0].querySelector(".slick-dots li.slick-active"),
        dotsLength = stickSlider[0].querySelectorAll(".slick-dots li").length,
        dotSize1 = "dot-size-1",
        dotSize2 = "dot-size-2",
        dotSize3 = "dot-size-3";
        let activeIndex = Array.from(dot.parentNode.children).indexOf(dot);
        stickSlider[0].querySelectorAll(".slick-dots li").forEach((li, index) => {
          li.classList.remove(dotSize1, dotSize2, dotSize3, "show");
        });
        stickSlider[0].querySelectorAll(".slick-dots li").forEach((li, index) => {
          let difference = activeIndex - index;
          if (difference === -2 && dotsLength + difference > -1) {
              li.classList.add(dotSize2, "show");
          }
          if (difference === -1 && dotsLength + difference > -1) {
              li.classList.add(dotSize3, "show");
          }
          if (difference === 1 && dotsLength - difference < dotsLength) {
              li.classList.add(dotSize3, "show");
          }
          if (difference === 2 && dotsLength - difference < dotsLength) {
              li.classList.add(dotSize2, "show");
          }
        });
      dot.classList.add("show");
    }

    loadSliderDotClasses(slider);

    slider.find(".slick-arrow").on("click", function (e) {
      loadSliderDotClasses(slider);
    });
  }
  document.getElementById("modal").classList.add('d-none');
  document.getElementById('generateMultiQR').disabled = true;
}