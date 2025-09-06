// Tab navigation - fixed to not use event parameter
function showCalculator(calcType) {
    // Hide all calculator sections
    document.querySelectorAll('.calculator-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected calculator and activate button
    document.getElementById(calcType + '-calc').classList.remove('hidden');
    
    // Find the clicked button and add active class
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(calcType)) {
            btn.classList.add('active');
        }
    });
}

// Calculator 1: What is X% of Y?
function calculatePercentage() {
    const percentage = parseFloat(document.getElementById('percentage').value);
    const number = parseFloat(document.getElementById('number').value);
    
    if (isNaN(percentage) || isNaN(number)) {
        document.getElementById('result1').textContent = 'Please enter valid numbers';
        return;
    }
    
    const result = (percentage / 100) * number;
    document.getElementById('result1').textContent = `${percentage}% of ${number} is ${result.toFixed(2)}`;
}

// Calculator 2: X is what % of Y?
function calculateWhatPercentage() {
    const part = parseFloat(document.getElementById('part').value);
    const whole = parseFloat(document.getElementById('whole').value);
    
    if (isNaN(part) || isNaN(whole) || whole === 0) {
        document.getElementById('result2').textContent = 'Please enter valid numbers';
        return;
    }
    
    const result = (part / whole) * 100;
    document.getElementById('result2').textContent = `${part} is ${result.toFixed(2)}% of ${whole}`;
}

// Calculator 3: Percentage Increase/Decrease
function calculatePercentageChange() {
    const originalValue = parseFloat(document.getElementById('originalValue').value);
    const newValue = parseFloat(document.getElementById('newValue').value);
    
    if (isNaN(originalValue) || isNaN(newValue)) {
        document.getElementById('result3').textContent = 'Please enter valid numbers';
        return;
    }
    
    const change = newValue - originalValue;
    const percentageChange = (change / originalValue) * 100;
    
    if (percentageChange >= 0) {
        document.getElementById('result3').textContent = `Increase of ${percentageChange.toFixed(2)}% (from ${originalValue} to ${newValue})`;
    } else {
        document.getElementById('result3').textContent = `Decrease of ${Math.abs(percentageChange).toFixed(2)}% (from ${originalValue} to ${newValue})`;
    }
}

// Discount Calculator
function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const discountPercent = parseFloat(document.getElementById('discountPercent').value);
    
    if (isNaN(originalPrice) || isNaN(discountPercent)) {
        document.getElementById('discountResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const discountAmount = (discountPercent / 100) * originalPrice;
    document.getElementById('discountResult').textContent = `Discount amount: $${discountAmount.toFixed(2)}`;
}

// Final Price After Discount
function calculateFinalPrice() {
    const originalPrice = parseFloat(document.getElementById('priceBeforeDiscount').value);
    const discountPercent = parseFloat(document.getElementById('discountValue').value);
    
    if (isNaN(originalPrice) || isNaN(discountPercent)) {
        document.getElementById('finalPriceResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const discountAmount = (discountPercent / 100) * originalPrice;
    const finalPrice = originalPrice - discountAmount;
    document.getElementById('finalPriceResult').textContent = `Final price: $${finalPrice.toFixed(2)} (You save $${discountAmount.toFixed(2)})`;
}

// Tip Calculator
function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercent = parseFloat(document.getElementById('tipPercent').value);
    const numPeople = parseInt(document.getElementById('numPeople').value) || 1;
    
    if (isNaN(billAmount) || isNaN(tipPercent)) {
        document.getElementById('tipResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const tipAmount = (tipPercent / 100) * billAmount;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;
    
    if (numPeople > 1) {
        document.getElementById('tipResult').textContent = `Total tip: $${tipAmount.toFixed(2)} | Total bill: $${totalAmount.toFixed(2)} | Per person: $${perPerson.toFixed(2)}`;
    } else {
        document.getElementById('tipResult').textContent = `Tip amount: $${tipAmount.toFixed(2)} | Total bill: $${totalAmount.toFixed(2)}`;
    }
}

// Grade Calculator
function calculateGradeNeeded() {
    const currentGrade = parseFloat(document.getElementById('currentGrade').value);
    const finalWeight = parseFloat(document.getElementById('finalWeight').value);
    const desiredGrade = parseFloat(document.getElementById('desiredGrade').value);
    
    if (isNaN(currentGrade) || isNaN(finalWeight) || isNaN(desiredGrade)) {
        document.getElementById('gradeResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const currentWeight = 100 - finalWeight;
    const currentContribution = (currentWeight / 100) * currentGrade;
    const neededOnFinal = (desiredGrade - currentContribution) / (finalWeight / 100);
    
    if (neededOnFinal > 100) {
        document.getElementById('gradeResult').textContent = `You need ${neededOnFinal.toFixed(2)}% on your final (not possible!)`;
    } else if (neededOnFinal < 0) {
        document.getElementById('gradeResult').textContent = `You already achieved your goal! (${neededOnFinal.toFixed(2)}% needed)`;
    } else {
        document.getElementById('gradeResult').textContent = `You need ${neededOnFinal.toFixed(2)}% on your final to get ${desiredGrade}%`;
    }
}

// Profit Margin Calculator
function calculateProfitMargin() {
    const cost = parseFloat(document.getElementById('cost').value);
    const revenue = parseFloat(document.getElementById('revenue').value);
    
    if (isNaN(cost) || isNaN(revenue) || cost === 0) {
        document.getElementById('marginResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const profit = revenue - cost;
    const profitMargin = (profit / revenue) * 100;
    
    document.getElementById('marginResult').textContent = `Profit: $${profit.toFixed(2)} | Margin: ${profitMargin.toFixed(2)}%`;
}

// Markup Calculator
function calculateMarkup() {
    const productCost = parseFloat(document.getElementById('productCost').value);
    const markupPercent = parseFloat(document.getElementById('markupPercent').value);
    
    if (isNaN(productCost) || isNaN(markupPercent)) {
        document.getElementById('markupResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const markupAmount = (markupPercent / 100) * productCost;
    const sellingPrice = productCost + markupAmount;
    
    document.getElementById('markupResult').textContent = `Selling price: $${sellingPrice.toFixed(2)} | Markup: $${markupAmount.toFixed(2)}`;
}

// Simple Interest Calculator
function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const timePeriod = parseFloat(document.getElementById('timePeriod').value);
    
    if (isNaN(principal) || isNaN(interestRate) || isNaN(timePeriod)) {
        document.getElementById('interestResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const interest = (principal * interestRate * timePeriod) / 100;
    const totalAmount = principal + interest;
    
    document.getElementById('interestResult').textContent = `Interest: $${interest.toFixed(2)} | Total: $${totalAmount.toFixed(2)}`;
}

// Percentage Difference Calculator
function calculatePercentageDifference() {
    const value1 = parseFloat(document.getElementById('value1').value);
    const value2 = parseFloat(document.getElementById('value2').value);
    
    if (isNaN(value1) || isNaN(value2)) {
        document.getElementById('differenceResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const average = (value1 + value2) / 2;
    const difference = Math.abs(value1 - value2);
    const percentageDifference = (difference / average) * 100;
    
    document.getElementById('differenceResult').textContent = `Difference: ${percentageDifference.toFixed(2)}%`;
}

// Value After Percentage Change
function calculateValueAfterChange() {
    const startValue = parseFloat(document.getElementById('startValue').value);
    const changePercent = parseFloat(document.getElementById('changePercent').value);
    
    if (isNaN(startValue) || isNaN(changePercent)) {
        document.getElementById('changeResult').textContent = 'Please enter valid numbers';
        return;
    }
    
    const changeAmount = (changePercent / 100) * startValue;
    const newValue = startValue + changeAmount;
    
    document.getElementById('changeResult').textContent = `New value: ${newValue.toFixed(2)} (Change: ${changeAmount.toFixed(2)})`;
}