import ShortenerPayload from "domain/Shortener";

class UrlShortenerDAO {
  constructor(model) {
    this.model = model;
  }

  async getOriginalUrlByShortCode(shortCode) {
    if (await this.checkIfNotExistShortCode(shortCode)) return -1;
    return await this.model.findAll({
      attributes: ["short_code", "original_url"],
      where: { short_code: shortCode },
    });
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

  async getUrlClicksCounter(shortCode) {
    return await this.model.findAll({
      attributes: ["visit_url_count"],
      where: {
        short_code: shortCode,
      },
    });
  }
}

const UrlShortenerDao = new UrlShortenerDAO(ShortenerPayload);

export default UrlShortenerDao;
