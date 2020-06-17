const evaluateOffset = (doc, selector, offsetType) => {
  return doc.querySelector(selector)[`offset${offsetType}`];
};

const screenConfig = {
  width: 1366,
  height: 768,
};

const isSidebySide = (firstSide, secondSide) => {
  firstSide.bottom = firstSide.top + firstSide.height;
  secondSide.bottom = secondSide.top + secondSide.height;

  return ( firstSide.top >= secondSide.top && firstSide.bottom <= secondSide.bottom ) ||
    ( secondSide.top >= firstSide.top && secondSide.bottom <= firstSide.bottom )
};

const setup = (path, { width, height }) => {
  beforeEach(() => {
    cy.viewport(width, height);
    cy.visit(path);
  })
}

describe('O corpo da página deve ter possuir uma cor que seja diferente da cor branca como cor de fundo', () => {
  setup('/', screenConfig)
  
  //Descobrir como escreve esse teste fazendo com que ele valide o fato de não ter cor alguma

  it("Cor de fundo diferente de branco", () => {
    cy.get('body')
      .should('not.have.css', 'backgroundColor', 'rgb(255, 255, 255)')
  })
})

describe('Seu site deve possuir uma barra superior com um título', () => {
  setup('/', { width: 1366, height: 768 })

  it(String.raw`A barra deve possuir o ID "cabecalho"`, () => {
    cy.get('#cabecalho')
      .should('exist');
  })

  it("A barra superior deve ser fixa no topo da página", () => {
    cy.get('#cabecalho')
      .should('have.css','position','fixed')
      .should('have.css', 'top', '0px');
  })

  it(String.raw`O título deve possuir o ID "titulo" e ser uma tag h1`, () => {
    cy.get('#cabecalho h1#titulo')
      .should('exist')
  })
})

describe('A página deve possuir uma foto sua', () => {
  setup('/', { width: 1366, height: 768 })

  it(String.raw`A foto deve ser inserida utilizando uma tag img com o ID "minha_foto"`, () => {
    cy.get('img#minha_foto')
      .should('have.attr', 'src');
  })
})

describe('A página deve possuir uma lista de lições aprendidas', () => {
  setup('/', { width: 1366, height: 768 })

  it(String.raw`A lista deve ser numerada e possuir o ID "licoes_aprendidas"`, () => {
    cy.get('ol#licoes_aprendidas')
      .should('exist');
  })

  it("A lista deve possuir 10 itens", () => {
    cy.get('ol#licoes_aprendidas')
      .find('li')
      .should('have.length', 10);
  })
})

describe('A página deve possuir uma lista de lições que ainda deseja aprender', () => {
  setup('/', { width: 1366, height: 768 })

  it(String.raw`A lista não deve ser numerada e deve possuir o ID "licoes_a_aprender"`, () => {
    cy.get('ul#licoes_a_aprender')
      .should('exist');
  })

  it("A lista deve possuir 10 itens", () => {
    cy.get('ul#licoes_a_aprender')
      .find('li')
      .should('have.length', 10);
  })
})

describe('A página deve possuir um rodapé', () => {
  setup('/', { width: 1366, height: 768 })

  it(String.raw`O rodapé deve possuir o ID "rodape"`, () => {
    cy.get('footer#rodape')
    .should('exist')
  })
})

// describe('HTML and CSS Project', () => {

//   it('A página deve possuir um rodapé com o ID "rodape"', () => {
//     cy.visit('./index.html');
//     cy.get('body>footer#rodape').should('exist');
//   });

//   it('A página deve possuir pelo menos uma imagem criada com a tag "img"', () => {
//     cy.visit('./index.html');
//     cy.get('img').should('have.attr', 'src');
//   });

//   it('A página deve possuir duas listas, uma ordenada e a outra não', () => {
//     cy.visit('./index.html');
//     cy.get('ol').should('exist');
//     cy.get('ul').should('exist');
//   });

//   it('A página deve possuir pelo menos um link externo (não se esqueça de configurar a abertura desse link em uma nova aba)', () => {
//     cy.visit('./index.html');
//     cy.get('a')
//     .then((a) => {
//       const actual = Array.from(a).some(element => (
//         element.target === '_blank' && element.href !== ''
//       ));
//       expect(actual).to.be.true
//     });
//   });

//   it('Torne o seu site mais acessível e melhore seu ranqueamento em mecanismos de busca na Web aplicando os elementos HTML de acordo com o sentido e propósito de cada um deles', () => {
//     cy.visit('./index.html');
//     cy.get('header').should('exist');
//     cy.get('nav').should('exist');
//     cy.get('aside').should('exist');
//     cy.get('article').should('exist');
//     cy.get('section').should('exist');
//     cy.get('footer').should('exist');
//   });

//   it("Seu site deve passar sem problemas na verificação de semântica do site achecker", () => {
//     cy.readFile('./index.html').then((content) => {
//       cy.visit('https://achecker.ca/checker/index.php');
//       cy.contains('Paste HTML Markup').click();
//       cy.get('textarea').type(content);
//       cy.get('#validate_paste').click();
//       cy.contains('Congratulations! No known problems.');
//     });
//   });

//   it('Adicione uma tabela à página', () => {
//     cy.visit('./index.html');
//     cy.get('table').should('exist');
//   });

//   it('Altere margin, padding e border dos elementos para ver, na prática, como esses atributos influenciam e melhoram a visualização dos componentes', () => {
//     cy.readFile('./style.css').then((content) => {
//       const styles = ['margin', 'padding', 'border']
//       expect(styles.every(style => content.match(style))).to.be.true
//     });
//   });

//   it('Altere atributos relacionados as fontes, como por exemplo, tamanho, cor, alinhamento, decoração (itálico, negrito, sublinhado etc)', () => {
//     cy.readFile('./style.css').then((content) => {
//       const styles = [
//         /[^-]color:/,
//         /font:/,
//         /font-(family|size|stretch|style|variant|weight):/,
//         /line-height:/
//       ]
//       expect(styles.some(style => content.match(style))).to.be.true
//     });
//   });

//   it('Organize componentes para ficarem dispostos lado a lado na página com as classes "lado-esquerdo" e "lado-direito" respectivamente', () => {
//     cy.visit('./index.html');
//     cy.document().then(doc => {
//       const leftSide = {
//         top: evaluateOffset(doc, '.lado-esquerdo', 'Top'),
//         height: evaluateOffset(doc, '.lado-esquerdo', 'Height')
//       }

//       const rightSide = {
//         top: evaluateOffset(doc, '.lado-direito', 'Top'),
//         height: evaluateOffset(doc, '.lado-direito', 'Height')
//       }

//       expect(isSidebySide(leftSide, rightSide)).to.be.true;
//     })
//   });
// });
