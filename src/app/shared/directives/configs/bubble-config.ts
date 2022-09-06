export class BubbleConfig {

  public height?: string = '2em';
  public width?: string = '2em';
  public lineHeight?: string = '2em';
  public verticalAlign?: string = 'middle';
  public fontWeight?: string = 'bold';
  public readonly textAlign?: string = 'center';
  public readonly borderRadius?: string = '50';
  public readonly backgroundColor?: string = 'rgba(127, 127, 127, 0.7)';
  public color?: string = "#000";

// cette methode mis à jours des propriétés de l'objet
  public deserialize(config: any): BubbleConfig{
    Object.assign(this, config);
    return this;
  }

  /*
  config s'appui sur le model class bubblconfig
  backgroundColor
  textAlign
  textAlign
  sont en readONly afin de ne pas y toucher
  on passe l'objet config
  */

}





