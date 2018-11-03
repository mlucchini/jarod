function make() {
    var template = document.getElementById("template").value;
    faker.locale = document.getElementById("locales").value;
    var input = faker.fake(template);
    document.getElementById("result").innerHTML = input;
    qr.value = input;
}

function makeDefault() {
    qr.value = faker.fake("v1|{{random.number}}|{{name.firstName}}|{{name.lastName}}|{{company.companyName}}|{{name.jobTitle}}|{{internet.email}}|{{phone.phoneNumber}}|{{address.country}}");
}

var qr = new QRious({
    element: document.getElementById('qr'),
    size: 200
});
