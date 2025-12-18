#include <Arduino.h>
#include <TFT_eSPI.h>
#include <lvgl.h>

TFT_eSPI tft = TFT_eSPI();
extern void lvgl_setup();

void setup() {
  Serial.begin(115200);
  tft.begin();
  tft.setRotation(1);

  lv_init();
  lvgl_setup();

  lv_obj_t *label = lv_label_create(lv_scr_act());
  lv_label_set_text(label, "Hello Jeremy!");
  lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
}

void loop() {
  lv_timer_handler();
  lv_tick_inc(5);
  delay(5);
}
