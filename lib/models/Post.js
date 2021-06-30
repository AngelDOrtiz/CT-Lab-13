import pool from '../utils/pool';

export default class Post {
  id;
  userId;
  photoUrl;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photoUrl;
  }

  static async insert({ userId, photoUrl, tags }) {
    const { rows } = await pool.query(
      'INSERT INTO osts (user_id, photo_url, tags) VALUES ($1, $2) RETURNING *',
      [userId, photoUrl, tags]
    );

    return new Post(rows[0]);
  }
}
