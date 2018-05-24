package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
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
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game gameEntry;

    @OneToMany(mappedBy = "ship_gp", fetch = FetchType.EAGER)
    private Set<Ship> ships = new HashSet<>();

    @OneToMany(mappedBy = "relatedGamePlayer", fetch = FetchType.EAGER)
    private  Set<Salvo> salvoes = new HashSet<>();

    public GamePlayer() {}

    public GamePlayer(Game inputGame, Player inputPlayer) {
        this.gameEntry = inputGame;
        this.player = inputPlayer;
    }

    @JsonIgnore
    public Player getGamePlayer() {
        return player;
    }

    public Game getGameEntry() {
        return gameEntry;
    }

    public void setGameEntry(Game gameEntry) {
        this.gameEntry = gameEntry;
    }

    public void setGamePlayer(Player gamePlayer) {
        this.player = gamePlayer;
    }

    public void addShip(Ship ship) {
        ship.setGamePlayer(this);
        ships.add(ship);
    }

    public Set<Ship> getShips() {
        return this.ships;
    }

    public void addSalvo(Salvo salvo) {
        this.salvoes.add(salvo);
    }

    public Set<Salvo> getSalvoes() {
        return salvoes;
    }

    public long getId() {
        return id;
    }

    public Date getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }

    public void setShips(Set<Ship> ships) {
        this.ships = ships;
    }

    public void setSalvoes(Set<Salvo> salvoes) {
        this.salvoes = salvoes;
    }
}
