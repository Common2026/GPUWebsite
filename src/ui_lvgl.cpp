#include <lvgl.h>
#include <TFT_eSPI.h>

extern TFT_eSPI tft;

static void my_disp_flush(lv_disp_drv_t *disp, const lv_area_t *area, lv_color_t *color_p) {
    tft.startWrite();
    tft.setAddrWindow(area->x1, area->y1,
                      area->x2 - area->x1 + 1,
                      area->y2 - area->y1 + 1);
    for (int y = area->y1; y <= area->y2; y++) {
        for (int x = area->x1; x <= area->x2; x++) {
            tft.pushColor(color_p->full);
            color_p++;
        }
    }
    tft.endWrite();
    lv_disp_flush_ready(disp);
}

void lvgl_setup() {
    static lv_disp_draw_buf_t draw_buf;
    static lv_color_t buf1[LV_HOR_RES_MAX * 10];
    lv_disp_draw_buf_init(&draw_buf, buf1, NULL, LV_HOR_RES_MAX * 10);

    static lv_disp_drv_t disp_drv;
    lv_disp_drv_init(&disp_drv);
    disp_drv.hor_res = LV_HOR_RES_MAX;
    disp_drv.ver_res = LV_VER_RES_MAX;
    disp_drv.flush_cb = my_disp_flush;
    disp_drv.draw_buf = &draw_buf;
    lv_disp_drv_register(&disp_drv);
}
