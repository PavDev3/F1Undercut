import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TracksService } from './data-access/tracks.service';

@Component({
  standalone: true,
  selector: 'app-track-list',
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Circuits</h1>
      <h2>Season {{ tracksService.season() }}</h2>
      <table class="trackList">
        <thead>
          <tr>
            <th>Track Name</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          @for (track of tracksService.tracks(); track track.circuitId) {
          <tr>
            <td>
              <a [routerLink]="['/track-details', track.circuitId]"
                >{{ track.circuitName }}
              </a>
            </td>

            <td>
              <div
                class="fflag ff-md {{
                  'fflag-' + track.Location.country.replaceAll(' ', '')
                }}"
              ></div>
              {{ track.Location.country }}
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: black;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      table {
        width: 50%;
        margin-top: 20px;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class TrackListComponent {
  tracksService = inject(TracksService);
}
