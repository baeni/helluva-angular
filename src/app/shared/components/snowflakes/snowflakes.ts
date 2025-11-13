import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MoveDirection, OutMode, Container } from '@tsparticles/engine'
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim' // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { NgParticlesService } from '@tsparticles/angular'
import { NgxParticlesModule } from '@tsparticles/angular'

@Component({
  selector: 'snowflakes',
  imports: [NgxParticlesModule],
  templateUrl: './snowflakes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Snowflakes {
  private readonly _ngParticlesService = inject(NgParticlesService)

  id = 'tsparticles'

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = 'http://foo.bar/particles.json'

  /* or the classic JavaScript object */
  particlesOptions = {
    fpsLimit: 90,
    particles: {
      color: {
        value: '#f1f1f1',
      },
      move: {
        direction: MoveDirection.bottom,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }

  ngOnInit(): void {
    this._ngParticlesService.init(async (engine) => {
      console.log(engine)

      // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      // await loadFull(engine)
      await loadSlim(engine)
    })
  }

  particlesLoaded(container: Container): void {
    console.log(container)
  }
}
