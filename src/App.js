import LottoPrinter from './LottoPrinter';
import LottoPlayer from './LottoPlayer';
import LottoMachine from './LottoMachine';
import LottoChecker from './LottoChecker';
import LottoCalculator from './LottoCalculator';

class App {
  async play() {
    const player = new LottoPlayer();
    const purchaseCount = await player.purchaseLotto();
    const machine = new LottoMachine(purchaseCount);
    LottoPrinter.printPurchaseComplete(purchaseCount);
    const tickets = await machine.getTickets(purchaseCount);
    const winningNumbers = await player.enterWinningNumbers();

    const checker = new LottoChecker(tickets, winningNumbers);
    const matches = checker.getMatches();
    LottoPrinter.printMatches(matches);
    const returnRate = LottoCalculator.getReturnRate(
      checker.revenue,
      player.amount,
    );
    LottoPrinter.printReturnRate(returnRate);
  }
}

export default App;
