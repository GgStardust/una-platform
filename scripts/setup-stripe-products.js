const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createStripeProducts() {
  try {
    console.log('Creating Stripe products...');

    // Create Strategy Session product
    const strategySessionProduct = await stripe.products.create({
      name: 'UNA Strategy Session',
      description: '60-90 minute focused consultation to plan your UNA formation and governance',
    });

    const strategySessionPrice = await stripe.prices.create({
      product: strategySessionProduct.id,
      unit_amount: 25000, // $250.00 in cents
      currency: 'usd',
    });

    console.log('Strategy Session created:');
    console.log(`Product ID: ${strategySessionProduct.id}`);
    console.log(`Price ID: ${strategySessionPrice.id}`);

    // Create Document Prep product
    const documentPrepProduct = await stripe.products.create({
      name: 'UNA Document Preparation',
      description: 'Complete package with personalized UNA documents and formation guidance',
    });

    const documentPrepPrice = await stripe.prices.create({
      product: documentPrepProduct.id,
      unit_amount: 75000, // $750.00 in cents
      currency: 'usd',
    });

    console.log('Document Prep created:');
    console.log(`Product ID: ${documentPrepProduct.id}`);
    console.log(`Price ID: ${documentPrepPrice.id}`);

    // Create Bundle product
    const bundleProduct = await stripe.products.create({
      name: 'UNA Formation Bundle',
      description: 'Strategy Session + Document Preparation (Save $100)',
    });

    const bundlePrice = await stripe.prices.create({
      product: bundleProduct.id,
      unit_amount: 100000, // $1000.00 in cents
      currency: 'usd',
    });

    console.log('Bundle created:');
    console.log(`Product ID: ${bundleProduct.id}`);
    console.log(`Price ID: ${bundlePrice.id}`);

    // Output the price IDs for updating the API
    console.log('\n=== UPDATE YOUR API FILES WITH THESE PRICE IDs ===');
    console.log(`STRATEGY_SESSION_PRICE_ID: ${strategySessionPrice.id}`);
    console.log(`DOCUMENT_PREP_PRICE_ID: ${documentPrepPrice.id}`);
    console.log(`BUNDLE_PRICE_ID: ${bundlePrice.id}`);

    console.log('\n=== UPDATE YOUR .env FILE ===');
    console.log(`STRIPE_STRATEGY_SESSION_PRICE_ID=${strategySessionPrice.id}`);
    console.log(`STRIPE_DOCUMENT_PREP_PRICE_ID=${documentPrepPrice.id}`);
    console.log(`STRIPE_BUNDLE_PRICE_ID=${bundlePrice.id}`);

  } catch (error) {
    console.error('Error creating Stripe products:', error);
  }
}

// Run the script
createStripeProducts();


