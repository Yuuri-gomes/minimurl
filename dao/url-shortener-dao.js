import ShortenerPayload from "models/Shortener";

class UrlShortenerDAO {
  constructor(model) {
    this.model = model;
  }

  async validateUniqueShortCode(shortCode) {
    return await this.model.findOne({ where: { shortCode } });
  }

  async create(payloadData) {
    try {
      const newPayload = await this.model.create(payloadData);
      return newPayload;
    } catch (error) {
      console.error("Erro ao criar o payload: ", error);
      throw error;
    }
  }

  async update(hash, newData) {
    const payload = await this.validateUniqueShortCode(hash);
    if (!payload) return null;

    return await payload.update(newData);
  }

  async delete(hash) {
    const payload = await this.findByHash(hash);
    if (!payload) return null;

    await payload.destroy();
    return true;
  }
}

export default UrlShortenerDAO(ShortenerPayload);
