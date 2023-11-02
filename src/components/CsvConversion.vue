<template>
    <div class="home">
      <h1> Convert JSON to CSV</h1>
      <input class="choose-file" type="file" ref="fileInput" @change="handleFileChange" />
      <button class="convert-to-csv" @click="convertToJsonToCsv">Convert to CSV</button>
      <a :href="csvData" download="output.csv" v-if="csvData">Download CSV</a>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        csvData: null,
      };
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      convertToJsonToCsv() {
        if (!this.selectedFile) {
          alert('Please select a JSON file first.');
          return;
        }
  
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            const csvContent = this.convertJsonToCsv(jsonData);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            this.csvData = URL.createObjectURL(blob);
          } catch (error) {
            alert('Error parsing JSON: ' + error);
          }
        };
        reader.readAsText(this.selectedFile);
      },
      convertJsonToCsv(jsonData) {
  if (!jsonData || !jsonData.length) {
    // If the JSON data is empty or not an array, return an empty string.
    return '';
  }

  // Create an array to store the CSV lines, starting with the header line.
  const csvLines = [];

  // Extract the header row from the first object in the JSON data.
  const header = Object.keys(jsonData[0]);

  // Add the header row to the CSV lines.
  csvLines.push(header.join(','));

  // Loop through each object in the JSON data and convert it to a CSV line.
  jsonData.forEach((item) => {
    const values = header.map((key) => {
      // Ensure values are properly escaped and enclosed in double quotes if necessary.
      const value = item[key];
      if (value != null) {
        return `"${value.toString().replace(/"/g, '""')}"`;
      }
      return '""'; // If the value is null or undefined, use an empty string.
    });

    // Add the values for this object as a CSV line.
    csvLines.push(values.join(','));
  });

  // Join all CSV lines with line breaks to create the final CSV content.
  const csvContent = csvLines.join('\n');

  return csvContent;
}

    },
  };
  </script>

  <style scoped>
  .choose-file {
    display: flex; 
    flex-direction: column;
    align-items: center;
    margin: 10px 550px;
  }
  .convert-to-csv {
    display: flex; 
    flex-direction: column;
    align-items: center;
    margin: 0px 550px;
  }


  </style>
  

  