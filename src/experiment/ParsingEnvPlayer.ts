import { IParseTree } from '../ParseTree';
import {
  BaseParsingEnv,
  IParsingExpression,
  Position,
} from '../ParsingExpression';

export class ParsingEnvPlayer extends BaseParsingEnv {
  private currentStack: IParsingExpression[] = [];
  constructor(
    public s: string,
    public deepestStack: IParsingExpression[],
    public maxIndex: number
  ) {
    super();
  }

  parse(pe: IParsingExpression, pos: Position): [IParseTree, Position] | null {
    this.currentStack.push(pe);
    if (pos.offset >= this.maxIndex) {
      this.maxIndex = pos.offset;
    }
    const result = pe.accept(this.recognizer, pos);
    this.currentStack.pop();
    return result;
  }
}
