// script.js
let chart;

function calcularDesplazamiento() {
  const L = parseFloat(document.getElementById('longitud').value);
  const M = parseFloat(document.getElementById('masa').value);
  const P = parseFloat(document.getElementById('mantenimiento').value);

  if (isNaN(L) || isNaN(M) || isNaN(P)) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Coeficientes del modelo
  const a = 2.5;
  const b1 = 0.8;
  const b2 = 0.05;
  const b3 = -0.1;

  const desplazamiento = a + b1 * L + b2 * M + b3 * P;

  document.getElementById('resultado').textContent =
    `Desplazamiento máximo: ${desplazamiento.toFixed(2)} mm`;

  graficar(L, M, P, desplazamiento);
}

function resetear() {
  document.getElementById('longitud').value = '';
  document.getElementById('masa').value = '';
  document.getElementById('mantenimiento').value = '';
  document.getElementById('resultado').textContent = 'Desplazamiento máximo: - mm';
  if (chart) chart.destroy();
}

function graficar(L, M, P, D) {
  const ctx = document.getElementById('grafico').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Longitud (m)', 'Masa (kg/m)', 'Mantenimiento (%)', 'Desplazamiento (mm)'],
      datasets: [{
        label: 'Valores de entrada y resultado',
        data: [L, M, P, D],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#28a745',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
