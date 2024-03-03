import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
})
//if Authetication pb : 
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

// to allow sending json
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.json("Hello from backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)

    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO BOOKS (`title`,`description`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    })
})




app.delete("/books/:id", (req, res) => {
    const bookdId = req.params.id
    const q = "DELETE FROM BOOKS WHERE id = (?)"

    db.query(q, [bookdId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })
})


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE BOOKS SET `title` = ? , `description` = ? , `price` = ? , `cover`= ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    })
})




app.listen(8800, () => {
    console.log("Connected to backend !")
})