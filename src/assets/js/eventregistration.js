import QRCode from 'qrcode';
import { proto } from './lib/trace_location_pb';
import { encode } from 'uint8-to-base64';

document.getElementById("generateQR").addEventListener("click", function () {
  let description = document.getElementById("description").value;
  let address = document.getElementById("address").value;

  if (!address) {
    alert("Bitte geben Sie eine Adresse an");
    return;
  }

  if (!description) {
    alert("Bitte geben Sie eine Anschrift an");
    return;
  }

  let locationData = new proto.CWALocationData();
  locationData.setVersion(1);
  locationData.setType(+document.getElementById("locationtype").value);
  locationData.setDefaultcheckinlengthinminutes(60);

  let crowdNotifierData = new proto.CrowdNotifierData();
  crowdNotifierData.setVersion(1);
  crowdNotifierData.setPublickey("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEc7DEstcUIRcyk35OYDJ95/hTg3UVhsaDXKT0zK7NhHPXoyzipEnOp3GyNXDVpaPi3cAfQmxeuFMZAIX2+6A5Xg==");

  let seed = new Uint8Array(16);
  crypto.getRandomValues(seed);
  crowdNotifierData.setCryptographicseed(seed);

  let traceLocation = new proto.TraceLocation();
  traceLocation.setVersion(1);
  traceLocation.setDescription(description);
  traceLocation.setAddress(address);
  // traceLocation.setStarttimestamp(1619043942);
  // traceLocation.setEndtimestamp(1619045942);

  let payload = new proto.QRCodePayload();
  payload.setLocationdata(traceLocation);
  payload.setCrowdnotifierdata(crowdNotifierData);
  payload.setVendordata(locationData.serializeBinary());
  payload.setVersion(1);

  console.log(payload.serializeBinary());
  let qrContent = encode(payload.serializeBinary()).replace('+', '-').replace('/', '_').replace(/=+$/, '');
  var canvas = document.getElementById('eventqrcode');
   
  QRCode.toCanvas(canvas, "https://e.coronawarn.app?v=1#" + qrContent, function (error) {
    if (error) console.error(error)
    console.log('success!');
  });
})
