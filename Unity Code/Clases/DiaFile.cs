[System.Serializable]
public class DiaFile
{
    //Nombre de personaje
    public string name;
    public string dialogue;
    public string font;
    public int fontSize;
    //Evento especial
    public int special;
    //Interrupcion
    public int interrupts;
    //Temblor de pantalla
    public int shaking;
    //Agrega a un dialogo ya terminado
    public int addendum;
    public float typeSpeed;
    //Cantidad y tipos de elecciones que se ofrecen tras completar el dialogo
    public int choiceAmount;
    public Choice[] choices;
    //Cantidad y tipo de marcas (condiciones) requeridas para acceder a este dialogo
    public int conditionAmount;
    public ConditionList[] conditionList;
}
