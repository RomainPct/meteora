import React from 'react'
import BubbleChart from '@weknow/react-bubble-chart-d3';

export const MassDistributionGraph = (props) => {

    function sortMeteorsByMass() {
        const from1gto50g = []
        const from50gto100g = []
        const from100gto150g = []
        const from150gto200g = []
        const from200gto250g = []
        const from250g500g = []
        const from500gto750g = []
        const from750gto1kg = []
        const from1kgto1and5kg = []
        const from1and5kgto2kg = []
        const from2kgto2and5kg = []
        const from2and5kgto3kg = []
        const from3kgto3and5kg = []
        const from3and5kgto4kg = []
        const from4kg = []

        console.log(props.meteors);

        props.meteors.forEach(meteor => {

            if (meteor>0 && meteor<51) {
                from1gto50g.push(meteor)
            }
            if (meteor>50 && meteor<101) {
                from50gto100g.push(meteor)
            }
            if (meteor>100 && meteor<151) {
                from100gto150g.push(meteor)
            }
            if (meteor>150 && meteor<201) {
                from150gto200g.push(meteor)
            }
            if (meteor>200 && meteor<251) {
                from200gto250g.push(meteor)
            }
            if (meteor>250 && meteor<501) {
                from250g500g.push(meteor)
            }
            if (meteor>500 && meteor<751) {
                from500gto750g.push(meteor)
            }
            if (meteor>750&& meteor<1001) {
                from750gto1kg.push(meteor)
            }
            if (meteor>1000&& meteor<1501) {
                from1kgto1and5kg.push(meteor)
            }
            if (meteor>1500&& meteor<2001) {
                from1and5kgto2kg.push(meteor)
            }
            if (meteor>2000&& meteor<2501) {
                from2kgto2and5kg.push(meteor)
            }
            if (meteor>2500&& meteor<3001) {
                from2and5kgto3kg.push(meteor)
            }
            if (meteor>3000&& meteor<3501) {
                from3kgto3and5kg.push(meteor)
            }
            if (meteor>3500&& meteor<4001) {
                from3and5kgto4kg.push(meteor)
            }
            if (meteor>4000) {
                from4kg.push(meteor)
            }
        });
        
        


    }


    sortMeteorsByMass()


    return (
        <section>
            <h2 className="titleDetailedYear">Year {props.year}'s meteors </h2>
            <BubbleChart
  graph= {{
    zoom: 1.1,
    offsetX: -0.05,
    offsetY: -0.01,
  }}
  width={1000}
  height={800}
  padding={0} // optional value, number that set the padding between bubbles
  showLegend={true} // optional value, pass false to disable the legend.
  legendPercentage={20} // number that represent the % of with that legend going to use.
  legendFont={{
        family: 'Arial',
        size: 12,
        color: '#000',
        weight: 'bold',
      }}
  valueFont={{
        family: 'Arial',
        size: 12,
        color: '#fff',
        weight: 'bold',
      }}
  labelFont={{
        family: 'Arial',
        size: 16,
        color: '#fff',
        weight: 'bold',
      }}
  //Custom bubble/legend click functions such as searching using the label, redirecting to other page

  data={[
    { label: 'CRM', value: 1 },
    { label: 'API', value: 1 },
    { label: 'Data', value: 1 },
    { label: 'Commerce', value: 1 },
    { label: 'AI', value: 3 },
    { label: 'Management', value: 5 },
    { label: 'Testing', value: 6 },
    { label: 'Mobile', value: 9 },
    { label: 'Conversion', value: 9 },
    { label: 'Misc', value: 21 },
    { label: 'Databases', value: 22 },
    { label: 'DevOps', value: 22 },
    { label: 'Javascript', value: 23 },
    { label: 'Languages / Frameworks', value: 25 },
    { label: 'Front End', value: 26 },
    { label: 'Content', value: 26 },
  ]}
/>
        </section>
    )
    
}
