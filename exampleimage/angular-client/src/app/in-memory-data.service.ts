export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Club Mate', price: 15.00 },
      { id: 2, name: 'Tschunk', price: 20.00 }
    ];
    return { heroes };
  }
}
