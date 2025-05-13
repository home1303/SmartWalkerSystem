#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "TTTT";        // 👈 ใส่ชื่อ WiFi ของคุณ
const char* password = "123456Aa"; // 👈 ใส่รหัสผ่าน WiFi

const char* GAS_URL = "https://script.google.com/macros/s/AKfycbxGEVEzDJf5hwUIO_WaB41Q4FkuSuil8Y8vqoXNKIRZVO3Z0YOCNZis_XpAuWfLDPsN/exec"; // 👈 URL จาก GAS Web App

String urlEncode(const char* msg) {
  String encodedMsg = "";
  char c;
  char code[4];
  while ((c = *msg++)) {
    if (isalnum(c)) {
      encodedMsg += c;
    } else {
      sprintf(code, "%%%02X", (unsigned char)c);
      encodedMsg += code;
    }
  }
  return encodedMsg;
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // เชื่อมต่อ WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

  // ข้อความแจ้งเตือน
  String message = "แจ้งเตือนจาก ESP32: ล้มแล้ว!3";

  // เข้ารหัสข้อความ
  String encodedMessage = urlEncode(message.c_str());

  // สร้าง URL พร้อมพารามิเตอร์
  String fullUrl = String(GAS_URL) + "?msg=" + encodedMessage;

  // ส่ง HTTP GET
  HTTPClient http;
  http.begin(fullUrl);
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response: " + response);
  } else {
    Serial.print("Error: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void loop() {
  // ไม่ต้องทำอะไรซ้ำ
}
