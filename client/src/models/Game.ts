
export default class GameData {
  constructor(
    public name: string, // ei: Bob
    public CPM: number, // ei: 335
    public accuracy: number, // ei: 78 (out of 100)
    public progress: number, // percent user has typed (ie: 50 -> halfway)

  ) {}
}