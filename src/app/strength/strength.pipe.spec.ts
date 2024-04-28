import { StrengthPipe } from "./strength.pipe"

describe('StrenthPipe', () => {
        it('should disply weak if strength is 5', () => {
                let pipe = new StrengthPipe();

                let val = pipe.transform(5);
                expect(val).toEqual('5 (weak)');
        })

        it('should disply strong if strength is 10', () => {
                let pipe = new StrengthPipe();

                let val = pipe.transform(10);
                expect(val).toEqual('10 (strong)');
        })
})