import { Font } from "@react-pdf/renderer";


let isFontRegistered = false

export function registerPdfFonts() {
  Font.register({
    family: "NotoSansKR",
    src: "/fonts/NOTOSANSKR-REGULAR.TTF",
  })

  Font.register({
    family: "NotoSansKR-Bold",
    src: "/fonts/NOTOSANSKR-BOLD.TTF",
  })

  isFontRegistered = true
}