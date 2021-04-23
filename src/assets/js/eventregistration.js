import QRCode from 'qrcode';
import { proto } from './lib/trace_location_pb';
import { encode } from 'uint8-to-base64';
import moment from 'moment';

document.getElementById('locationtype').addEventListener('input', function (e) {
  UpdateQRForm();
});
function UpdateQRForm() {
  if (!document.getElementById('qrform')) {
    return;
  }

  let locationtype = +document.getElementById('locationtype').value;
  if (locationtype && (locationtype >= 9 || locationtype === 2)) {
    document.getElementById('event-duration').classList.remove('d-none');
  } else {
    document.getElementById('event-duration').classList.add('d-none');
  }
}
UpdateQRForm();

document.getElementById('generateQR').addEventListener('click', function (e) {
  e.preventDefault();

  if (ValidateQRForm()) {
    GenerateQRCode();

    document.getElementById('eventplaceholder').classList.add('d-none');
    let canvas = document.getElementById('eventqrcode');
    canvas.classList.remove('d-none');
  }
});

document.getElementById('downloadCode').addEventListener('click', function (e) {
  e.preventDefault();

  document.getElementById('eventplaceholder').classList.remove('d-none');
  let canvas = document.getElementById('eventqrcode');
  canvas.classList.add('d-none');

  if (ValidateQRForm()) {
    GenerateQRCode();

    let dlLink = document.createElement('a');
    dlLink.download = document.getElementById('description').value + '.png';
    dlLink.href = document.getElementById('eventqrcode').toDataURL();
    dlLink.click();
  }
});

function ValidateQRForm() {
  let errors = 0;

  let errorMessages = document.querySelectorAll('.invalid-feedback');
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].style.display = 'none';
  }

  let description = document.getElementById('description').value;
  if (!description.length) {
    document.getElementById('qr-error-descriptionrequired').style.display = 'block';
    errors++;
  } else if (description.length > 100) {
    document.getElementById('qr-error-descriptionmax').style.display = 'block';
    errors++;
  }

  let address = document.getElementById('address').value;
  if (!address.length) {
    document.getElementById('qr-error-addressrequired').style.display = 'block';
    errors++;
  } else if (address.length > 100) {
    document.getElementById('qr-error-addressmax').style.display = 'block';
    errors++;
  }

  let defaultcheckinlength = document.getElementById('defaultcheckinlength').value;
  if (!defaultcheckinlength) {
    document.getElementById('qr-error-defaultcheckinlengthrequired').style.display = 'block';
    errors++;
  } else if (isNaN(defaultcheckinlength)) {
    document.getElementById('qr-error-defaultcheckinlengthnumber').style.display = 'block';
    errors++;
  }

  let locationtype = +document.getElementById('locationtype').value;
  if (locationtype >= 9 || locationtype === 2) {
    let timeReg = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    let dateReg = /^\d{2}.\d{2}.\d{4}$/

    let startdate = document.getElementById('starttime-date').value;
    let starttime = document.getElementById('starttime-time').value;
    if (!starttime || !startdate) {
      document.getElementById('qr-error-starttimerequired').style.display = 'block';
      errors++;
    } else {
      if (!dateReg.test(startdate) || !moment(startdate.split(".").reverse().join("-")).isValid()) {
        document.getElementById('qr-error-starttimeinvaliddate').style.display = 'block';
        errors++;
      }

      if (!timeReg.test(starttime)) {
        document.getElementById('qr-error-starttimeinvalidtime').style.display = 'block';
        errors++;
      }
    }

    let enddate = document.getElementById('endtime-date').value;
    let endtime = document.getElementById('endtime-time').value;
    if (!endtime || !enddate) {
      document.getElementById('qr-error-endtimerequired').style.display = 'block';
      errors++;
    } else {
      if (!dateReg.test(enddate) || !moment(enddate.split(".").reverse().join("-")).isValid()) {
        document.getElementById('qr-error-endtimeinvaliddate').style.display = 'block';
        errors++;
      }

      if (!timeReg.test(endtime)) {
        document.getElementById('qr-error-endtimeinvalidtime').style.display = 'block';
        errors++;
      }
    }
  }

  return errors === 0;
}

function GenerateQRCode() {
  let description = document.getElementById('description').value;
  let address = document.getElementById('address').value;
  let defaultcheckinlength = document.getElementById('defaultcheckinlength').value;
  let locationtype = +document.getElementById('locationtype').value;

  let locationData = new proto.CWALocationData();
  locationData.setVersion(1);
  locationData.setType(locationtype);
  locationData.setDefaultcheckinlengthinminutes(+defaultcheckinlength);

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

  if (locationtype >= 9 || locationtype === 2) {
    let startdate = document.getElementById('starttime-date').value.split('.');
    let starttime = document.getElementById('starttime-time').value;
    traceLocation.setStarttimestamp(moment(startdate.reverse().join('-') + ' ' + starttime).format('X'));

    let enddate = document.getElementById('endtime-date').value.split('.');
    let endtime = document.getElementById('endtime-time').value;
    traceLocation.setEndtimestamp(moment(enddate.reverse().join('-') + ' ' + endtime).format('X'));
  }

  let payload = new proto.QRCodePayload();
  payload.setLocationdata(traceLocation);
  payload.setCrowdnotifierdata(crowdNotifierData);
  payload.setVendordata(locationData.serializeBinary());
  payload.setVersion(1);

  let qrContent = encode(payload.serializeBinary()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  let canvas = document.getElementById('eventqrcode');
  let ctx = canvas.getContext('2d');
   
  QRCode.toDataURL('https://e.coronawarn.app?v=1#' + qrContent, {
    margin: 0,
    width: 1100
  }, function (err, qrUrl) {
    if (err) {
      console.error(err);
      return;
    }

    let img = new Image();
    img.onload = function() {
      ctx.width = 1654;
      ctx.height = 2339;
      canvas.width = 1654;
      canvas.height = 2339;
      canvas.style.maxWidth = "100%"

      ctx.drawImage(img, 0, 0);
      let qrImg = new Image();
      qrImg.onload = function() {
        ctx.drawImage(qrImg, 275, 230);
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(description, 225, 1460);
        ctx.fillText(address, 225, 1510);
      }
      qrImg.src = qrUrl;
    }
    img.src = '/assets/img/pt-poster-1.0.0.png';
  });
}
