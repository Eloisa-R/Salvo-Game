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
    public CommandLineRunner initData(PlayerRepository repository, GameRepository grepository) {
        return (args) -> {
            // save a couple of players
            repository.save(new Player("Jack", "Bauer", "j.bauer@ctu.gov"));
            repository.save(new Player("Chloe", "O'Brian", "c.obrian@ctu.gov"));
            repository.save(new Player("Kim", "Bauer", "kim_bauer@gmail.com"));
            repository.save(new Player("David", "Palmer", "t.almeida@ctu.gov"));
            grepository.save(new Game());
            Game secondGame = new Game();
            Game thirdGame = new Game();
            secondGame.setCreationDate(new Date().from(secondGame.getCreationDate().toInstant().plusSeconds(3600)));
            thirdGame.setCreationDate(new Date().from(thirdGame.getCreationDate().toInstant().plusSeconds(7200)));
            grepository.save(secondGame);
            grepository.save(thirdGame);

        };
    }
}
