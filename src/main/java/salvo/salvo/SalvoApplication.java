package salvo.salvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

    @Bean
    public CommandLineRunner initData(PlayerRepository repository, GameRepository gRepository, GamePlayerRepository gpRepository) {
        return (args) -> {
            // save a couple of players
            Player playerOne = new Player("Jack", "Bauer", "j.bauer@ctu.gov");
            Player playerTwo = new Player("Chloe", "O'Brian", "c.obrian@ctu.gov");
            Player playerThree = new Player("Kim", "Bauer", "kim_bauer@gmail.com");
            Player playerFour = new Player("David", "Palmer", "t.almeida@ctu.gov");
            repository.save(playerOne);
            repository.save(playerTwo);
            repository.save(playerThree);
            repository.save(playerFour);
            Game firstGame = new Game();
            Game secondGame = new Game();
            Game thirdGame = new Game();
            Game fourthGame = new Game();
            Game fifthGame = new Game();
            Game sixthGame = new Game();
            secondGame.setCreationDate(new Date().from(secondGame.getCreationDate().toInstant().plusSeconds(3600)));
            thirdGame.setCreationDate(new Date().from(thirdGame.getCreationDate().toInstant().plusSeconds(7200)));
            fourthGame.setCreationDate(new Date().from(fourthGame.getCreationDate().toInstant().plusSeconds(10800)));
            fifthGame.setCreationDate(new Date().from(fifthGame.getCreationDate().toInstant().plusSeconds(14400)));
            sixthGame.setCreationDate(new Date().from(sixthGame.getCreationDate().toInstant().plusSeconds(18000)));
            gRepository.save(firstGame);
            gRepository.save(secondGame);
            gRepository.save(thirdGame);
            gRepository.save(fourthGame);
            gRepository.save(fifthGame);
            gRepository.save(sixthGame);
            gpRepository.save(new GamePlayer(firstGame, playerOne));
            gpRepository.save(new GamePlayer(firstGame, playerTwo));
            gpRepository.save(new GamePlayer(secondGame, playerOne));
            gpRepository.save(new GamePlayer(secondGame, playerTwo));
            gpRepository.save(new GamePlayer(thirdGame, playerTwo));
            gpRepository.save(new GamePlayer(thirdGame, playerFour));
            gpRepository.save(new GamePlayer(fourthGame,playerOne));
            gpRepository.save(new GamePlayer(fourthGame, playerTwo));
            gpRepository.save(new GamePlayer(fifthGame, playerFour));
            gpRepository.save(new GamePlayer(fifthGame, playerOne));
            gpRepository.save(new GamePlayer(sixthGame, playerThree));

        };
    }
}
