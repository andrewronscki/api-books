import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParamsValidationPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {

    if(!value) {
      throw new BadRequestException(`The value of parameter '${metadata.data}' should be informated`);
    }

    return value;
  }
}