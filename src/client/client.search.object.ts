import { ClientListingFilters } from '../database/models/client.model';
import { clientIndex } from '../elastic-search/services/constant/client.elastic';

export class ElasticSearchPayload {
  size: number;
  from: number;
  query: any;

  constructor(size: number, from: number, query: any) {
    this.size = size;
    this.from = from;
    this.query = query;
  }
}

export class ClientSearchObject {
  public static searchObject(q: ClientListingFilters) {
    const body = this.elasticSearchPayload(q);
    return { index: clientIndex._index, body, q };
  }

  public static elasticSearchPayload(q: any): ElasticSearchPayload {
    const shouldClauses = [];

    if (q && (q.id || q.name || q.email || q.cin)) {
      if (q.id) shouldClauses.push({ match: { id: q.id } });
      if (q.name) shouldClauses.push({ match: { name: q.name } });
      if (q.email) shouldClauses.push({ match: { email: q.email } });
      if (q.cin) shouldClauses.push({ match: { cin: q.cin } });
    }

    let query;
    if (shouldClauses.length > 0) {
      query = {
        bool: {
          should: shouldClauses,
        },
      };
    } else {
      query = { match_all: {} };
    }
    const fromRecord = q.perPage * (q.page - 1) + 1;
    return new ElasticSearchPayload(q.perPage, fromRecord, query);
  }
}
