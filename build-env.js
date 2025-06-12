const fs = require('fs');

// Create environment configuration for production
const envConfig = `
// Environment configuration injected at build time
window.ENV = {
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY}'
};
`;

// Write the environment configuration to a file
fs.writeFileSync('env-config.js', envConfig);

console.log('Environment configuration generated successfully');
