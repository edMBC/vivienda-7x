export function getProyectoImagen(nombreProyecto: string): string {
  if (!nombreProyecto) return "/images/propiedades/boseque_de_arrayan.png";

  // 1. Diccionario exacto: conecta el nombre limpio del backend con el nombre real de tu archivo .png
  const mapaArchivos: Record<string, string> = {
    // Proyectos con nombres similares a su archivo
    "bosques de arrayan": "boseque_de_arrayan", 
    "bosques de turpial": "bosque_de_turpial",
    "la macarena": "la_macarena",
    "mongui": "mongui",
    "pamplona": "pamplona",
    "reserva de guayacan": "reserva_de_guayacan",
    "reserva de saman": "saman",
    "inari": "inari",
    "los nogales": "losnogales", 
    "karakali": "karakali",
    "versalles": "versalles",
    "abeto": "abeto",
    "payande": "payande",
    "araucaria": "araucaria",
    "vibonce": "vivoonce", 
    
    // Equivalencias obligatorias para los proyectos que usan imágenes prestadas de tu lista
    "la arboleda": "tocancipa",
    "verde esperanza": "zarzal",
    "maipore": "eldorado",
    "bogota (general)": "la_macarena",
    "municipios norte": "tocancipa",
    "municipios sur": "saman"
  };

  // 2. Normalizamos el texto de entrada (quitamos mayúsculas y tildes)
  const nombreLimpio = nombreProyecto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // 3. Buscamos el nombre exacto del archivo en el diccionario
  const nombreArchivo = mapaArchivos[nombreLimpio];

  // 4. Retornamos la ruta hacia la imagen local /images/ obligatoria
  if (nombreArchivo) {
    return `/images/propiedades/${nombreArchivo}.png`; 
  }

  // 5. Fallback dinámico por si se agrega un proyecto nuevo futuro
  const slugDinamico = nombreLimpio.replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_");
  return `/images/propiedades/${slugDinamico}.png`;
}