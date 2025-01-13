import papa from "papaparse";

export async function parseCSV(csvFile) {
  return new Promise((resolve, reject) => {
    papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function fiftyHottestStars(csvFile) {
  const colorIndexColumn = "ci"; 
  const idStarColumn = "id"; 
  let hottestStars = [];

  try {
    // Parse le fichier CSV
    const data = await parseCSV(csvFile);

    // Extraire et trier les indices de couleur (ci)
    const sortedData = data
      .slice()
      .filter((row) => row[colorIndexColumn] !== undefined) 
      .sort((a, b) => a[colorIndexColumn] - b[colorIndexColumn]) 
      .slice(0, 50); 

    // Calculer la température pour chaque étoile et associer avec le nom
    hottestStars = sortedData.map((row) => {
      const ci = row[colorIndexColumn]; 
      const name = row[idStarColumn];
      const temperature = -15833.33 * ci + 33666.67; // Calcul de la température

      return { name, temperature }; // Retourne un objet avec nom et température
    });

    return hottestStars; // Retourne le tableau structuré
  } catch (error) {
    console.error("Erreur lors du traitement des données CSV :", error);
    throw error;
  }
}