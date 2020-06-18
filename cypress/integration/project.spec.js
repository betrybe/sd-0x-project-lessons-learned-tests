const requirement1 = 'O corpo da página deve possuir uma cor de fundo especifíca';
const requirement2 = 'Seu site deve possuir uma barra superior com um título';
const requirement3 = 'A página deve possuir uma foto sua';
const requirement4 = 'A página deve possuir uma lista de lições aprendidas';
const requirement5 = 'A página deve possuir uma lista de lições que ainda deseja aprender';
const requirement6 = 'A página deve possuir um rodapé';
const requirement7 = 'A página deve possuir pelo menos um link externo';
const requirement8 = 'Crie um artigo sobre seu aprendizado';
const requirement9 = 'Crie uma seção que conta uma passagem sobre seu aprendizado';
const requirement10 = 'Torne o seu site mais acessível e melhore seu ranqueamento em mecanismos de busca na Web aplicando os elementos HTML de acordo com o sentido e propósito de cada um deles';
const requirement11 = 'Seu site deve passar sem problemas na verificação de semântica do site achecker';
const requirementBonus12 = 'Adicione uma tabela à página';
const requirementBonus13 = 'Brinque com o Box model!';
const requirementBonus14 = 'Altere atributos relacionados as fontes';
const requirementBonus15 = 'Faça com que seu artigo e seção sobre aprendizados fiquem um ao lado do outro';

const screenConfig = {
  width: 1366,
  height: 768,
};

const semanticTags = ['article', 'header', 'nav', 'section', 'aside', 'footer']

const evaluateOffset = (doc, selector, offsetType) => {
  return doc.querySelector(selector)[`offset${offsetType}`];
};

const isSidebySide = (firstSide, secondSide) => {
  firstSide.bottom = firstSide.top + firstSide.height;
  secondSide.bottom = secondSide.top + secondSide.height;

  return (firstSide.top >= secondSide.top && firstSide.bottom <= secondSide.bottom) ||
    (secondSide.top >= firstSide.top && secondSide.bottom <= firstSide.bottom)
};

const setup = (path, { width, height }) => {
  beforeEach(() => {
    cy.viewport(width, height);
    cy.visit(path);
  })
}

const shouldExist = (selector, itText) => {
  it(itText, () => {
    cy.get(selector)
      .should('exist');
  })
}

const verifyExistingStyle = (styles) => {
  cy.readFile('./style.css').then((content) => {
    console.log(styles)
    console.log(content)
    expect(styles.some(style => content.match(style)), `Do not match styles ${styles}`).to.be.true
  });
}

describe(requirement1, () => {
  setup('/', screenConfig)

  it("Possuir cor de fundo: rgb(253, 251, 251)", () => {
    cy.get('body')
      .should('have.css', 'backgroundColor', 'rgb(233, 244, 233)')
  })
})

describe(requirement2, () => {
  setup('/', screenConfig)

  shouldExist('#cabecalho', String.raw`A barra deve possuir o ID "cabecalho"`, )

  it("A barra superior deve ser fixa no topo da página", () => {
    cy.get('#cabecalho')
      .should('have.css', 'position', 'fixed')
      .should('have.css', 'top', '0px');
  })
  
  shouldExist('#cabecalho h1#titulo', String.raw`O título deve possuir o ID "titulo" e ser uma tag h1`)
})

describe(requirement3, () => {
  setup('/', screenConfig)

  it(String.raw`A foto deve ser inserida utilizando uma tag img com o ID "minha_foto"`, () => {
    cy.get('img#minha_foto')
      .should('have.attr', 'src');
  })
})

describe(requirement4, () => {
  setup('/', screenConfig)

  shouldExist('ol#licoes_aprendidas', String.raw`A lista deve ser numerada e possuir o ID "licoes_aprendidas"`)

  it("A lista deve possuir 10 itens", () => {
    cy.get('ol#licoes_aprendidas')
      .find('li')
      .should('have.length', 10);
  })
})

describe(requirement5, () => {
  setup('/', screenConfig)

  shouldExist('ul#licoes_a_aprender', String.raw`A lista não deve ser numerada e deve possuir o ID "licoes_a_aprender"`)

  it("A lista deve possuir 10 itens", () => {
    cy.get('ul#licoes_a_aprender')
      .find('li')
      .should('have.length', 10);
  })
})

describe(requirement6, () => {
  setup('/', screenConfig)

  shouldExist('ul#licoes_a_aprender', String.raw`O rodapé deve possuir o ID "rodape"`)
  
  it(String.raw`O rodapé deve possuir o ID "rodape"`, () => {
    cy.get('footer#rodape')
      .should('exist')
  })
})

describe(requirement7, () => {
  setup('/', screenConfig)

  it("A configuração desse link deve ser feita para abrir em uma nova aba do navegador", () => {
    cy.get('a')
      .then((a) => {
        const actual = Array.from(a).some(element => (
          element.target === '_blank' && element.href !== ''
        ));
        expect(actual).to.be.true
      });
  })
})

describe(requirement8, () => {
  setup('/', screenConfig)

  shouldExist('article', "A `tag` `article` devem ser utilizadas")

  it("O artigo deve ter mais de 300 letras e menos de 600", () => {
    cy.get("article")
      .invoke('text')
      .then((text) => {
        expect(text).to.have.length.of.at.most(600)
        expect(text).to.have.length.of.at.above(300)
      })
  })
})

describe(requirement9, () => {
  setup('/', screenConfig)

  shouldExist('aside', "A `tag` `aside` deve ser utilizada")

  it("A seção deve ter mais que 100 letras e menos que 300", () => {
    cy.get("aside")
      .invoke('text')
      .then((text) => {
        expect(text).to.have.length.of.at.above(100)
        expect(text).to.have.length.of.at.most(300)
      })
  })
})

describe(requirement10, () => {
  setup('/', screenConfig)

  semanticTags.forEach(element => {
    shouldExist(element, `A página deve possuir um elemento '${element}'`)
  })
})

describe(requirement11, () => {
  it("Seu site deve passar sem problemas na verificação de semântica do site achecker", () => {
    cy.readFile('./index.html').then((content) => {
      cy.visit('https://achecker.ca/checker/index.php');
      cy.contains('Paste HTML Markup').click();
      cy.get('textarea').type(content);
      cy.get('#validate_paste').click();
      cy.contains('Congratulations! No known problems.');
    });
  });
})

// Bônus

describe(requirementBonus12, () => {
  setup('/', screenConfig)

  shouldExist('table', 'A página deve possuir uma tabela')
})

describe(requirementBonus13, () => {
  setup('/', screenConfig)

  it('Altere `margin`, `padding` e `border` dos elementos para ver, na prática, como esses atributos influenciam e melhoram a visualização dos componentes', () => {
    cy.readFile('./style.css').then((content) => {
      const styles = ['margin', 'padding', 'border']
      expect(styles.every(style => content.match(style)), "Do not match styles margin, padding and border").to.be.true
    });
  });
})

describe(requirementBonus14, () => {
  setup('/', screenConfig)

  it('Altere o tamanho da letra', () => {
    const styles = [
      /font:/,
      /font-size:/,
    ]
    verifyExistingStyle(styles)
  });

  it('Altere a cor da letra', () => {
    const styles = [
      /font:/,
      /[^-]color:/,
    ]
    verifyExistingStyle(styles)
  });

  it('Altere o espaçamento entre as linhas', () => {
    const styles = [
      /font:/,
      /line-height:/,
    ]
    verifyExistingStyle(styles)
  });

  it('Altere o `font-family`', () => {
      const styles = [
        /font:/,
        /font-family:/,
      ]
      verifyExistingStyle(styles)
  });
})

describe(requirementBonus15, () => {

  setup('/', screenConfig)

  shouldExist(".lado-esquerdo", "Utilizar a classe 'lado-esquerdo'")

  shouldExist(".lado-direito", "Utilizar a classe 'lado-direito'")

  it('Verificar se os elementos com as classes lado-direito e lado-esquerdo estão posicionados corretamente', () => {
    cy.document().then(doc => {
      const leftSide = {
        top: evaluateOffset(doc, '.lado-esquerdo', 'Top'),
        height: evaluateOffset(doc, '.lado-esquerdo', 'Height')
      }

      const rightSide = {
        top: evaluateOffset(doc, '.lado-direito', 'Top'),
        height: evaluateOffset(doc, '.lado-direito', 'Height')
      }

      expect(isSidebySide(leftSide, rightSide), "Not side by side. *hint - search for float, width and positioning properties to achieve this requirement*").to.be.true;
    })
  });
});
