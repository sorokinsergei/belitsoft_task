import app from './app';

const PORT = 3001;

let server: ReturnType<typeof app.listen>;

async function init() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Express App Listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup Error:', err);
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Uncaught exception! Shutting down...');
  console.error(err);
  server?.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception! Shutting down...');
  console.error(err);
  process.exit(1);
});

init();
