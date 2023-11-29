import express from 'express';
import { createConnection } from 'mysql';

const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root'
};

const conn = createConnection(config);

conn.connect((err) => {
    if (err) throw err;

    conn.query('CREATE DATABASE IF NOT EXISTS newdb', (err) => {
        if (err) throw err;
        conn.query('USE newdb', (err) => {
            if (err) throw err;

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT NOT NULL,
                    name VARCHAR(255),
                    PRIMARY KEY (id)
                )
            `;
            conn.query(createTableQuery, (err) => {
                if (err) throw err;

                const insertQuery = `INSERT INTO people (name) VALUES ('Raphael')`;
                conn.query(insertQuery, (err) => {
                    if (err) throw err;

                    conn.end();
                });
            });
        });
    });
});

app.get('/', (_, res) => {
    res.send('<h1>Full Cycle Rocks!!</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
