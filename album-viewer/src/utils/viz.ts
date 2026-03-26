import * as d3 from 'd3'
// load the data from a json file and create the d3 svg in the then function
// create the svg element and set the width and height
// create the scales for the x and y axes
// x-axis are the month series and y-axis show the numbers of album selled


interface AlbumSalesData {
  month: string // e.g. "2024-01", "2024-02"
  albumsSold: number
}

/**
 * Renders a bar chart of albums sold per month inside the given container element.
 * Data is fetched from the provided JSON URL.
 *
 * @param container - The DOM element to render the chart into
 * @param dataUrl - URL returning JSON array of { month, albumsSold }
 */
export async function renderAlbumSalesChart(
  container: HTMLElement,
  dataUrl: string
): Promise<void> {
  const response = await fetch(dataUrl)
  if (!response.ok) {
    throw new Error(`Failed to load sales data: ${response.statusText}`)
  }
  const data: AlbumSalesData[] = await response.json()

  // Clear any previous chart
  d3.select(container).selectAll('*').remove()

  // Chart dimensions
  const margin = { top: 30, right: 30, bottom: 70, left: 60 }
  const width = 800 - margin.left - margin.right
  const height = 450 - margin.top - margin.bottom

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // X axis — month labels
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, width])
    .padding(0.2)

  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end')

  // Y axis — albums sold
  const maxSold = d3.max(data, (d) => d.albumsSold) ?? 0
  const y = d3
    .scaleLinear()
    .domain([0, maxSold])
    .nice()
    .range([height, 0])

  svg.append('g').call(d3.axisLeft(y))

  // Bars
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.month)!)
    .attr('y', (d) => y(d.albumsSold))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.albumsSold))
    .attr('fill', '#4f46e5')

  // Y-axis label
  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 15)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .text('Albums Sold')

  // X-axis label
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 5)
    .attr('text-anchor', 'middle')
    .text('Month')

  // Title
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .text('Album Sales by Month')
}
