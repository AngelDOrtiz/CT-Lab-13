import  jwt  from 'jsonwebtoken';
import pool from '../utils/pool.js';


export default class User {
    id;
    username;
    passwordHash;
    profilePhotoUrl;
  
    constructor(row) {
      this.id = row.id;
      this.username = row.username;
      this.passwordHash = row.passwordHash;
      this.profilePhotoUrl = row.password_hash;
    }
  
    static async insert({ username, passwordHash, profilePhotoUrl }) {
      const { rows } = await pool.query(
        'INSERT INTO users (username, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *',
        [username, passwordHash, profilePhotoUrl]
      );
  
      return new User(rows[0]);
    }
  
    authToken() {
      return jwt.sign({ ...this }, process.env.APP_SECRET, {
        expiresIn: '24h'
      });
    }
  
    toJSON() {
      return {
        username: this.username,
        passwordHash: this.passwordHash,
        profilePhotoUrl: this.profilePhotoUrl
      };
    }
}
