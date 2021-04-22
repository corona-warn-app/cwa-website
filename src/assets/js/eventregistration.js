import QRCode from 'qrcode';
import { proto } from './lib/trace_location_pb';
import { encode } from 'uint8-to-base64';
// import moment from 'moment';

document.getElementById('locationtype').addEventListener('input', function (e) {
  UpdateQRForm();
});
function UpdateQRForm() {
  if (!document.getElementById("qrform")) {
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

    let canvas = document.getElementById('eventqrcode');
    canvas.style.display = 'block';
  }
});

document.getElementById('downloadCode').addEventListener('click', function (e) {
  e.preventDefault();

  let canvas = document.getElementById('eventqrcode');
  canvas.style.display = 'none';

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
    // TODO: Use momentjs to validate dates
    let dateReg = /^\d{2}.\d{2}.\d{4}$/
    let timeReg = /^\d{2}:\d{2}$/

    let startdate = document.getElementById('starttime-date').value;
    let starttime = document.getElementById('starttime-time').value;
    if (!starttime || !startdate) {
      document.getElementById('qr-error-starttimerequired').style.display = 'block';
      errors++;
    } else {
      if (!dateReg.test(startdate)) {
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
      if (!dateReg.test(enddate)) {
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

  let locationData = new proto.CWALocationData();
  locationData.setVersion(1);
  locationData.setType(+document.getElementById('locationtype').value);
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

  // TODO: Parse date
  // traceLocation.setStarttimestamp(1619043942);
  // traceLocation.setEndtimestamp(1619045942);

  let payload = new proto.QRCodePayload();
  payload.setLocationdata(traceLocation);
  payload.setCrowdnotifierdata(crowdNotifierData);
  payload.setVendordata(locationData.serializeBinary());
  payload.setVersion(1);

  let qrContent = encode(payload.serializeBinary()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  let canvas = document.getElementById('eventqrcode');
   
  QRCode.toCanvas(canvas, 'https://e.coronawarn.app?v=1#' + qrContent, function (error) {
    if (error) console.error(error)
  });
}
