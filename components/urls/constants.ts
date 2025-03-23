// QR code correction levels
export const QR_CORRECTION_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
]

// QR Color presets
export const COLOR_PRESETS = [
  { name: "Classic", fg: "#000000", bg: "#FFFFFF" },
  { name: "Inverted", fg: "#FFFFFF", bg: "#000000" },
  { name: "Blue", fg: "#0A3D91", bg: "#E6F0FF" },
  { name: "Purple", fg: "#5E17EB", bg: "#F7F2FF" },
  { name: "Green", fg: "#0C5C2E", bg: "#E6F7ED" },
  { name: "Gold", fg: "#815C15", bg: "#FFF8E6" },
  { name: "Red", fg: "#91170A", bg: "#FFEBE6" },
]

// Default QR style settings
export const DEFAULT_QR_STYLES = {
  fgColor: "#000000",
  bgColor: "#FFFFFF",
  size: 240,
  level: "H", // Nivel alto por defecto para mejor compatibilidad con logos
  borderSize: 20,
  borderRadius: 8,
  logoEnabled: false,
  logoSize: 60, // Tamaño reducido a 60px como solicitado
  logoUrl: "",
  logoBackgroundColor: "#FFFFFF",
  logoRadius: 8,
}

export type QRStylesType = typeof DEFAULT_QR_STYLES

// Función para calcular el tamaño máximo recomendado del logo
export const calculateMaxLogoSize = (qrSize: number, errorCorrectionLevel: string) => {
  // Porcentajes máximos recomendados por nivel de corrección
  const maxPercentages = {
    L: 0.07, // 7% para nivel bajo
    M: 0.15, // 15% para nivel medio
    Q: 0.25, // 25% para nivel cuartil
    H: 0.25, // Reducido a 25% para nivel alto (más conservador)
  }

  const percentage = maxPercentages[errorCorrectionLevel as keyof typeof maxPercentages] || 0.15
  // El área del logo no debe exceder este porcentaje del área total
  const maxArea = qrSize * qrSize * percentage
  // Convertir área a dimensión (asumiendo logo cuadrado)
  return Math.floor(Math.sqrt(maxArea))
}

