  const regions = {
    blue: {
      name: "Płat czołowy",
      color: "#b4d9ed",
      diseases: [
        "Choroba Parkinsona",
        "Otępienie czołowo-skroniowe",
        "Zespół czołowy",
        "Udar płata czołowego"
      ],
      functions: "Odpowiada za planowanie, podejmowanie decyzji, kontrolę ruchów oraz osobowość. Zarządza funkcjami wykonawczymi i kontrolą impulsów.",
      details: "Płat czołowy to centrum dowodzenia mózgu, zajmujący około 1/3 powierzchni kory mózgowej. Koordynuje złożone funkcje poznawcze, kontroluje ruchy ciała poprzez korę ruchową oraz wpływa na zachowanie społeczne i emocje. Kora przedczołowa jest odpowiedzialna za myślenie abstrakcyjne, rozwiązywanie problemów i planowanie przyszłości. Obszar Broki w lewym płacie czołowym kontroluje produkcję mowy. Uszkodzenia mogą prowadzić do zmian osobowości, problemów z koncentracją, impulsywności oraz trudności w planowaniu.",
      subregions: [
        {
          name: "Kora przedczołowa",
          role: "Funkcje wykonawcze, podejmowanie decyzji, kontrola impulsów"
        },
        {
          name: "Kora ruchowa",
          role: "Inicjowanie i kontrola ruchów dowolnych"
        },
        {
          name: "Obszar Broki",
          role: "Produkcja mowy i artykulacja"
        },
        {
          name: "Kora przedruchowa",
          role: "Planowanie i koordynacja złożonych ruchów"
        }
      ],
      symptoms: [
        "Zmiany osobowości i zachowania",
        "Problemy z pamięcią roboczą",
        "Trudności w planowaniu",
        "Osłabienie kontroli impulsów",
        "Problemy z mówieniem (afazja ruchowa)"
      ]
    },
    yellow: {
      name: "Płat ciemieniowy",
      color: "#fcfb97",
      diseases: [
        "Udar mózgu",
        "Zaburzenia czucia",
        "Zespół Gerstmanna",
        "Agnozja przestrzenna"
      ],
      functions: "Przetwarza informacje sensoryczne z całego ciała, w tym dotyk, temperaturę i ból. Odpowiada za orientację przestrzenną i percepcję.",
      details: "Płat ciemieniowy integruje informacje zmysłowe z różnych części ciała, tworząc spójny obraz naszego otoczenia i położenia w przestrzeni. Pomaga w nawigacji przestrzennej, rozpoznawaniu obiektów przez dotyk oraz koordynacji wzrokowo-ruchowej. Kora czuciowa odbiera sygnały dotykowe z całego ciała. Lewa półkula płata ciemieniowego jest zaangażowana w operacje matematyczne i logiczne myślenie, podczas gdy prawa półkula specjalizuje się w orientacji przestrzennej i rozpoznawaniu wzorców wizualnych.",
      subregions: [
        {
          name: "Kora czuciowa pierwotna",
          role: "Odbieranie podstawowych wrażeń dotykowych, bólu, temperatury"
        },
        {
          name: "Kora czuciowa wtórna",
          role: "Interpretacja złożonych bodźców dotykowych"
        },
        {
          name: "Zakręt nadbrzeżny",
          role: "Przetwarzanie języka, czytanie, rozumienie gestów"
        },
        {
          name: "Zakręt kątowy",
          role: "Przetwarzanie matematyczne, rozumienie metafor"
        }
      ],
      symptoms: [
        "Utrata czucia (niedoczulica lub drętwienie)",
        "Problemy z orientacją przestrzenną",
        "Trudności w wykonywaniu celowych ruchów (apraksja)",
        "Zaniedbywanie jednej strony ciała",
        "Problemy z matematyką (akalkulia)"
      ]
    },
    green: {
      name: "Płat skroniowy",
      color: "#b6cf9d",
      diseases: [
        "Choroba Alzheimera",
        "Padaczka płata skroniowego",
        "Otępienie semantyczne",
        "Afazja Wernickego"
      ],
      functions: "Przetwarza informacje słuchowe, odpowiada za pamięć długoterminową oraz rozumienie języka. Zawiera hipokamp, kluczowy dla tworzenia wspomnień.",
      details: "Płat skroniowy jest niezbędny do słyszenia, rozumienia mowy oraz przechowywania wspomnień. Lewy płat skroniowy specjalizuje się w przetwarzaniu języka werbalnego i zapamiętywaniu faktów, podczas gdy prawy zajmuje się rozpoznawaniem twarzy, melodii i pamięcią wzrokową. Hipokamp, głęboko ukryta struktura, jest kluczowa dla konsolidacji pamięci krótkotrwałej w długotrwałą. Ciało migdałowate reguluje emocje, szczególnie strach i agresję. Uszkodzenia mogą prowadzić do poważnych problemów z pamięcią (amnezja), trudności w rozumieniu mowy lub rozpoznawaniu twarzy (prozopagnozja).",
      subregions: [
        {
          name: "Kora słuchowa pierwotna",
          role: "Przetwarzanie podstawowych dźwięków i tonów"
        },
        {
          name: "Obszar Wernickego",
          role: "Rozumienie języka mówionego i pisanego"
        },
        {
          name: "Hipokamp",
          role: "Tworzenie nowych wspomnień, pamięć przestrzenna"
        },
        {
          name: "Ciało migdałowate",
          role: "Przetwarzanie emocji, szczególnie strachu"
        },
        {
          name: "Zakręt wrzecionowaty",
          role: "Rozpoznawanie twarzy i obiektów"
        }
      ],
      symptoms: [
        "Utrata pamięci długoterminowej",
        "Trudności w rozumieniu mowy",
        "Problemy z rozpoznawaniem twarzy",
        "Napady padaczkowe",
        "Zmiany w zachowaniach emocjonalnych",
        "Halucynacje słuchowe"
      ]
    },
    pink: {
      name: "Płat potyliczny",
      color: "#F9A8D4",
      diseases: [
        "Migrena z aurą",
        "Zaburzenia widzenia",
        "Ślepota korowa",
        "Prozopagnozja wzrokowa"
      ],
      functions: "Główne centrum przetwarzania informacji wzrokowych. Interpretuje sygnały z oczu, rozpoznaje kształty, kolory i ruchy.",
      details: "Płat potyliczny, najmniejszy z płatów mózgowych, przekształca sygnały świetlne docierające z oczu w obrazy, które świadomie widzimy. Analizuje wszystkie aspekty widzenia w hierarchiczny sposób: od podstawowego rozpoznawania krawędzi, kolorów i ruchu w korze wzrokowej pierwotnej (V1), po złożone rozpoznawanie obiektów, twarzy i scen w obszarach wyższego rzędu (V2-V5). Prawa i lewa półkula płata potylicznego przetwarzają informacje z przeciwległych połówek pola widzenia. Uszkodzenia mogą prowadzić do ślepoty korowej (utrata widzenia przy zdrowych oczach), trudności w rozpoznawaniu kolorów, ruchów lub całkowitej niezdolności do rozpoznawania obiektów mimo zachowania widzenia.",
      subregions: [
        {
          name: "Kora wzrokowa pierwotna (V1)",
          role: "Pierwsze przetwarzanie informacji wzrokowych, wykrywanie krawędzi i podstawowych kształtów"
        },
        {
          name: "Kora wzrokowa wtórna (V2-V5)",
          role: "Rozpoznawanie złożonych wzorców, kolorów, ruchu i głębi"
        },
        {
          name: "Szlak brzuszny ('co')",
          role: "Rozpoznawanie i identyfikacja obiektów"
        },
        {
          name: "Szlak grzbietowy ('gdzie')",
          role: "Lokalizacja przestrzenna obiektów i koordynacja wzrokowo-ruchowa"
        }
      ],
      symptoms: [
        "Ślepota korowa (utrata widzenia mimo zdrowych oczu)",
        "Hemianopsja (utrata połowy pola widzenia)",
        "Akinetopsja (niemożność widzenia ruchu)",
        "Achromatopsja (utrata widzenia barwnego)",
        "Agnozja wzrokowa (niemożność rozpoznawania obiektów)",
        "Halucynacje wzrokowe"
      ]
    },
    white: {
      name: "Móżdżek i pień mózgu",
      color: "#FFFFFF",
      diseases: [
        "Stwardnienie rozsiane",
        "Drżenie samoistne",
        "Ataksja móżdżkowa",
        "Udar pnia mózgu",
        "Choroba Parkinsona"
      ],
      functions: "Móżdżek koordynuje ruchy i równowagę. Pień mózgu kontroluje funkcje życiowe jak oddychanie, rytm serca i sen.",
      details: "Móżdżek, położony z tyłu mózgu, zawiera ponad połowę wszystkich neuronów w mózgu i precyzyjnie dostosowuje ruchy ciała, utrzymuje równowagę oraz koordynuje płynność ruchów. Uczestniczy także w uczeniu się motorycznym i niektórych funkcjach poznawczych. Pień mózgu, najstarsza ewolucyjnie część mózgu, łączy mózg z rdzeniem kręgowym i reguluje podstawowe funkcje automatyczne niezbędne do życia: oddychanie, rytm serca, ciśnienie krwi, połykanie, cykl sen-czuwanie. Składa się z trzech części: śródmózgowia (kontrola ruchów oczu, refleksy), mostu (przekazywanie sygnałów, koordynacja z móżdżkiem) i rdzenia przedłużonego (funkcje życiowe). Uszkodzenia pnia mózgu mogą być śmiertelne lub prowadzić do śpiączki.",
      subregions: [
        {
          name: "Móżdżek",
          role: "Precyzyjna koordynacja ruchów, równowaga, uczenie się motoryczne, płynność mowy"
        },
        {
          name: "Śródmózgowie",
          role: "Kontrola ruchów oczu, przetwarzanie wzrokowe i słuchowe, regulacja czuwania"
        },
        {
          name: "Most",
          role: "Przekazywanie informacji między korą mózgową a móżdżkiem, udział w oddychaniu i śnie"
        },
        {
          name: "Rdzeń przedłużony",
          role: "Kontrola oddychania, rytmu serca, ciśnienia krwi, kaszlu, wymiotów, połykania"
        },
        {
          name: "Twór siatkowaty",
          role: "Regulacja świadomości, cyklu sen-czuwanie, uwagi i czujności"
        }
      ],
      symptoms: [
        "Ataksja (niezborność ruchów, problemy z koordynacją)",
        "Zaburzenia równowagi i chodu",
        "Drżenie, szczególnie przy wykonywaniu celowych ruchów",
        "Dysartria (niewyraźna mowa)",
        "Zawroty głowy, nudności",
        "Problemy z oddychaniem lub rytmem serca",
        "Zaburzenia połykania",
        "Zaburzenia świadomości lub śpiączka (przy uszkodzeniu pnia)"
      ]
    }
  };

  export default regions;