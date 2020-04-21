
[System.Serializable]
public class Choice
{
    public string text;
    //Marca que se imprime en 'routes' al tomar esta eleccion
    public string mark;
    //Si tomar este eleccion provoca una divergencia a otra marca o no
    public bool divergence;
    //Condiciones a cumplir para tener acceso a esta eleccion especifica
    public int conditionAmount;
    public ConditionList[] conditionList;
}
