package salvo.salvo;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    private Date creationDate;

    @OneToMany(mappedBy = "gameEntry", fetch=FetchType.EAGER)
    Set<GamePlayer> gameplays;

    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    Set<Score> scores = new HashSet<>();

    public Game() {
        this.creationDate = new Date();
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public long getId() {
        return id;
    }

    public Set<GamePlayer> getGameplays() {
        return gameplays;
    }

    public void addGame(GamePlayer gameplay){
        gameplay.setGameEntry(this);
        gameplays.add(gameplay);
    }

    public Set<Score> getScores() {
        return scores;
    }

    public List<Player> getPlayers() {
        return gameplays.stream().map(gp -> gp.getGamePlayer()).collect(toList());
    }
}
