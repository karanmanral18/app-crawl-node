import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationQueryToNumberPipe implements PipeTransform {
  transform(
    value: string | number | undefined,
    metadata: ArgumentMetadata,
  ): number {
    switch (metadata.data) {
      case 'perPage':
      case 'page':
        const castedValue = parseFloat(value?.toString());
        if (isNaN(castedValue)) {
          return metadata.data === 'page' ? 1 : 15;
        }
        return castedValue;
      default:
        throw new Error('Invalid query passed for casting');
    }
  }
}
