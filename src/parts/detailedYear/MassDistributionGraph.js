import '../../style/MassDistributionGraph.css'
import React from 'react'
import BubbleChart from '@weknow/react-bubble-chart-d3';

export const MassDistributionGraph = (props) => {

    function sortMeteorsByMass() {
        const categories = [
            { label: '1g-50g', value: 0, color:"#A6D9DC" },
            { label: '50g-100g', value: 0, color:"#6799B1" },
            { label: '100g-150g', value: 0 , color:"#47799C"},
            { label: '150g-200g', value: 0 , color:"#5284A4"},
            { label: '200g-250g', value: 0 , color:"#3F698C"},
            { label: '250g-500g', value: 0 , color:"#3A6083"},
            { label: '500g-750g', value: 0 , color:"#335375"},
            { label: '750g-1kg', value: 0 , color:"#2D4869"},
            { label: '1kg-1.5kg', value: 0 , color:"#243859"},
            { label: '1.5kg-2kg', value: 0 , color:"#453956"},
            { label: '2kg-2.5kg', value: 0 , color:"#6A3A53"},
            { label: '2.5kg-3kg', value: 0 , color:"#8B3B50"},
            { label: '3kg-3.5kg', value: 0 , color:"#B03B4D"},
            { label: '3.5kg-4kg', value: 0 , color:"#CD3C4B"},
            { label: '4kg+', value: 0 , color:"#E63C49"}]

        props.meteors.forEach(meteor => {

            if (meteor.mass < 51) {
                categories[0].value += 1
            }
            if (meteor.mass>50 && meteor.mass<101) {
                categories[1].value += 1
            }
            if (meteor.mass>100 && meteor.mass<151) {
                categories[2].value += 1
            }
            if (meteor.mass>150 && meteor.mass<201) {
                categories[3].value += 1
            }
            if (meteor.mass>200 && meteor.mass<251) {
                categories[4].value += 1
            }
            if (meteor.mass>250 && meteor.mass<501) {
                categories[5].value += 1
            }
            if (meteor.mass>500 && meteor.mass<751) {
                categories[6].value += 1
            }
            if (meteor.mass>750&& meteor.mass<1001) {
                categories[7].value += 1
            }
            if (meteor.mass>1000&& meteor.mass<1501) {
                categories[8].value += 1
            }
            if (meteor.mass>1500&& meteor.mass<2001) {
                categories[9].value += 1
            }
            if (meteor.mass>2000&& meteor.mass<2501) {
                categories[10].value += 1
            }
            if (meteor.mass>2500&& meteor.mass<3001) {
                categories[11].value += 1
            }
            if (meteor.mass>3000&& meteor.mass<3501) {
                categories[12].value += 1
            }
            if (meteor.mass>3500&& meteor.mass<4001) {
                categories[13].value += 1
            }
            if (meteor.mass>4000) {
                categories[14].value += 1
            }
            

        });
        
        return categories
    }


    return (
        <section>
            <h2 className="titleDetailedYear">Year {props.year}'s meteors </h2>
            <BubbleChart
                graph= {{
                    zoom: 0.6,
                    offsetX: 0.15,
                    offsetY: 0.1,
                }}
                width={800}
                height={600}
                padding={0} // optional value, number that set the padding between bubbles
                showLegend={false} // optional value, pass false to disable the legend.
                legendPercentage={10} // number that represent the % of with that legend going to use.
                legendFont={{
                        family: 'Quicksand',
                        size: 15,
                        color: '#fff',
                        weight: 'bold',
                    }}
                valueFont={{
                        family: 'Quicksand',
                        size: 12,
                        color: '#fff',
                        weight: 'bold',
                    }}
                labelFont={{
                        family: 'Quicksand',
                        size: 12,
                        color: '#fff',
                        weight: 'bold',
                    }}
                //Custom bubble/legend click functions such as searching using the label, redirecting to other page

                data={sortMeteorsByMass()}
            />
        </section>
    )
    
}
