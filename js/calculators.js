document.addEventListener('DOMContentLoaded', () => {
  const calculatorCards = document.querySelectorAll('.calculator-card');

  if (!calculatorCards.length) return;

  const roundCurrency = (value) => Number(value).toFixed(2);

  const bindGST = (form) => {
    const amount = Number(form.querySelector('[name="gst-amount"]').value || 0);
    const rate = Number(form.querySelector('[name="gst-rate"]').value || 0);
    const type = form.querySelector('[name="gst-type"]').value;
    const result = form.querySelector('[data-result]');

    if (!amount || !rate) {
      result.textContent = 'Enter valid values to compute the GST output.';
      return;
    }

    const tax = type === 'inclusive' ? (amount * rate) / (100 + rate) : amount * (rate / 100);
    const base = type === 'inclusive' ? amount - tax : amount;
    result.innerHTML = `
      <div><strong>Tax Amount:</strong> ₹${roundCurrency(tax)}</div>
      <div><strong>Taxable Value:</strong> ₹${roundCurrency(base)}</div>
      <div><strong>Total Value:</strong> ₹${roundCurrency(type === 'inclusive' ? amount : base + tax)}</div>
    `;
  };

  const bindMRP = (form) => {
    const mrp = Number(form.querySelector('[name="mrp-price"]').value || 0);
    const rate = Number(form.querySelector('[name="mrp-rate"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!mrp || !rate) {
      result.textContent = 'Enter a valid MRP and GST rate to estimate the tax component.';
      return;
    }

    const gst = (mrp * rate) / (100 + rate);
    const base = mrp - gst;
    result.innerHTML = `
      <div><strong>Base Price:</strong> ₹${roundCurrency(base)}</div>
      <div><strong>GST Amount:</strong> ₹${roundCurrency(gst)}</div>
      <div><strong>MRP:</strong> ₹${roundCurrency(mrp)}</div>
    `;
  };

  const bindTDS = (form) => {
    const amount = Number(form.querySelector('[name="tds-amount"]').value || 0);
    const rate = Number(form.querySelector('[name="tds-rate"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!amount || !rate) {
      result.textContent = 'Enter valid payment amount and rate to estimate TDS.';
      return;
    }

    const tds = amount * (rate / 100);
    result.innerHTML = `
      <div><strong>TDS Amount:</strong> ₹${roundCurrency(tds)}</div>
      <div><strong>Net Amount Paid:</strong> ₹${roundCurrency(amount - tds)}</div>
    `;
  };

  const bindIncomeTax = (form) => {
    const income = Number(form.querySelector('[name="income-tax-income"]').value || 0);
    const deductions = Number(form.querySelector('[name="income-tax-deductions"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!income) {
      result.textContent = 'Enter your annual income to estimate the illustrative tax.';
      return;
    }

    const taxable = Math.max(income - deductions, 0);
    const taxRate = taxable <= 250000 ? 0 : taxable <= 500000 ? 0.05 : taxable <= 1000000 ? 0.1 : 0.15;
    const tax = taxable * taxRate;
    result.innerHTML = `
      <div><strong>Taxable Income:</strong> ₹${roundCurrency(taxable)}</div>
      <div><strong>Illustrative Tax:</strong> ₹${roundCurrency(tax)}</div>
      <small>Assumption: This is a simplified illustration for FY 2026-27 and not professional tax advice.</small>
    `;
  };

  const bindHRA = (form) => {
    const rent = Number(form.querySelector('[name="hra-rent"]').value || 0);
    const salary = Number(form.querySelector('[name="hra-salary"]').value || 0);
    const allowance = Number(form.querySelector('[name="hra-allowance"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!rent || !salary) {
      result.textContent = 'Enter rent and salary details to calculate HRA exemption.';
      return;
    }

    const actual = Math.min(rent, salary * 0.5, allowance);
    result.innerHTML = `
      <div><strong>Estimated HRA Exemption:</strong> ₹${roundCurrency(actual)}</div>
      <div><strong>Remaining HRA:</strong> ₹${roundCurrency(Math.max(allowance - actual, 0))}</div>
    `;
  };

  const bindEMI = (form) => {
    const principal = Number(form.querySelector('[name="emi-principal"]').value || 0);
    const rate = Number(form.querySelector('[name="emi-rate"]').value || 0);
    const tenure = Number(form.querySelector('[name="emi-tenure"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!principal || !rate || !tenure) {
      result.textContent = 'Enter loan amount, rate and tenure to estimate EMI.';
      return;
    }

    const monthlyRate = (rate / 12) / 100;
    const emi = principal * monthlyRate * (Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1));
    const total = emi * tenure;
    const interest = total - principal;
    result.innerHTML = `
      <div><strong>Monthly EMI:</strong> ₹${roundCurrency(emi)}</div>
      <div><strong>Total Repayment:</strong> ₹${roundCurrency(total)}</div>
      <div><strong>Total Interest:</strong> ₹${roundCurrency(interest)}</div>
    `;
  };

  const bindNetWorth = (form) => {
    const assets = Number(form.querySelector('[name="networth-assets"]').value || 0);
    const liabilities = Number(form.querySelector('[name="networth-liabilities"]').value || 0);
    const result = form.querySelector('[data-result]');
    const net = assets - liabilities;
    result.innerHTML = `
      <div><strong>Net Worth:</strong> ₹${roundCurrency(net)}</div>
      <div><strong>Total Assets:</strong> ₹${roundCurrency(assets)}</div>
      <div><strong>Total Liabilities:</strong> ₹${roundCurrency(liabilities)}</div>
    `;
  };

  const bindEffectiveCapital = (form) => {
    const paidUpCapital = Number(form.querySelector('[name="capital-paidup"]').value || 0);
    const reserves = Number(form.querySelector('[name="capital-reserves"]').value || 0);
    const borrowings = Number(form.querySelector('[name="capital-borrowings"]').value || 0);
    const result = form.querySelector('[data-result]');

    const effectiveCapital = paidUpCapital + reserves - borrowings;
    result.innerHTML = `
      <div><strong>Effective Capital:</strong> ₹${roundCurrency(effectiveCapital)}</div>
      <div><strong>Formula:</strong> Paid-up capital + Reserves - Borrowings</div>
    `;
  };

  const bindDepreciation = (form) => {
    const assetValue = Number(form.querySelector('[name="dep-asset"]').value || 0);
    const salvage = Number(form.querySelector('[name="dep-salvage"]').value || 0);
    const life = Number(form.querySelector('[name="dep-life"]').value || 0);
    const result = form.querySelector('[data-result]');

    if (!assetValue || !life) {
      result.textContent = 'Enter asset value and useful life to estimate annual depreciation.';
      return;
    }

    const amount = (assetValue - salvage) / life;
    result.innerHTML = `
      <div><strong>Annual Depreciation:</strong> ₹${roundCurrency(amount)}</div>
      <div><strong>Asset Basis:</strong> ₹${roundCurrency(assetValue - salvage)}</div>
    `;
  };

  calculatorCards.forEach((card) => {
    const form = card.querySelector('form');
    const resetBtn = card.querySelector('[data-reset]');
    const trigger = card.querySelector('[data-calc]');

    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const type = form.dataset.calculator;
        if (type === 'gst') bindGST(form);
        if (type === 'mrp') bindMRP(form);
        if (type === 'tds') bindTDS(form);
        if (type === 'income-tax') bindIncomeTax(form);
        if (type === 'hra') bindHRA(form);
        if (type === 'emi') bindEMI(form);
        if (type === 'net-worth') bindNetWorth(form);
        if (type === 'effective-capital') bindEffectiveCapital(form);
        if (type === 'depreciation') bindDepreciation(form);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        const result = form.querySelector('[data-result]');
        if (result) result.textContent = 'Enter your values to see the calculation result.';
      });
    }
  });
});
