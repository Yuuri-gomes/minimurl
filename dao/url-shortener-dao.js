import ShortenerPayload from "domain/Shortener";

class UrlShortenerDAO {
  constructor(model) {
    this.model = model;
  }

  async getOriginalUrlByShortCode(shortCode) {
    return await this.model.findByPk(shortCode);
  }

  async create(payloadData) {
    try {
      return await this.model.create(payloadData);
    } catch (error) {
      console.error("Erro ao criar o payload: ", error);
      throw error;
    }
  }

  async update(hash, newData) {
    return await this.model.update(newData, {
      where: {
        short_code: hash,
      },
    });
  }

  async delete(hash) {
    return await this.model.destroy({
      where: {
        short_code: hash,
      },
    });
  }

  async checkIfNotExistShortCode(shortCode) {
    return (
      (await this.model.count({
        where: {
          short_code: shortCode,
        },
      })) === 0
    );
  }
}

const UrlShortenerDao = new UrlShortenerDAO(ShortenerPayload);

export default UrlShortenerDao;
