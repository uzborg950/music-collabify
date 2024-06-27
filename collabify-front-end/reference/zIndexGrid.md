### Z-index distribution in DAW View

This file explains the zIndex distribution of the grid in the DAW view.

## Grid Layout

The Daw view grid is made of the following components given in order.
NavigationBar TimelineReferenceBar
Layers TrackGrid

There is an additional absolute positioned component called MainPlayTicker

## Z-index distribution

The zIndex hierarchy is given below:

TrackGrid: 0

MainPlayTicker: 1

TimelineReferenceBar: 2

Layers: 3

Navigation Bar: 4
