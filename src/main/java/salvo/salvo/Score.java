package salvo.salvo;


import javax.persistence.*;
import java.util.Date;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game")
    private Game game;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player")
    private Player player;

    double scorePoints;

    Date finishDate;

    public Score(){}

    public Score(Game inputGame, Player inputPlayer, double inputScore, Date inputfinish){
        this.game = inputGame;
        this.player = inputPlayer;
        this.scorePoints = inputScore;
        this.finishDate = inputfinish;
    }


    public long getId() {
        return id;
    }

    public Game getGame() {
        return game;
    }

    public Player getPlayer() {
        return player;
    }

    public double getScorePoints() {
        return scorePoints;
    }

    public Date getFinishDate() {
        return finishDate;
    }
}
