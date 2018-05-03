package salvo.salvo;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class GamePlayer {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    private Date dateJoined;
    /*Many to One rel. because a player, Dave, can have
    participated in several game instances. So several
    game instances can refer to one person, Dave.*/

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player gamePlayer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game gameEntry;

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    Set<Ship> ships;

    public GamePlayer() {}

    public GamePlayer(Game inputGame, Player inputPlayer) {
        this.gameEntry = inputGame;
        this.gamePlayer = inputPlayer;
    }

    public Player getGamePlayer() {
        return gamePlayer;
    }

    public Game getGameEntry() {
        return gameEntry;
    }

    public void setGameEntry(Game gameEntry) {
        this.gameEntry = gameEntry;
    }

    public void setGamePlayer(Player gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    public void addShip(Ship ship) {
        ship.setGamePlayer(this);
        ships.add(ship);
    }

    public Set<Ship> getShips() {
        return ships;
    }

    public long getId() {
        return id;
    }
}
