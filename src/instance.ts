
import { FierySystem, FieryInstance, FieryOptionsInput, FieryTarget, FierySource, FieryEntry, FieryOptions } from './types'
import { forEach, isString } from './util'
import { factory } from './factory'
import { getEntry, closeEntry } from './entry'
import { removeCacheFromInstance } from './cache'
import { globalOptions } from './options'
import { callbacks } from './callbacks'
import * as operations from './operations'


export function getInstance (systemOverrides?: Partial<FierySystem>): FieryInstance
{
  const system = buildSystem(systemOverrides)

  const targetFactory = (source: FierySource, options?: FieryOptionsInput, name?: string): FieryTarget => {
    return factory(getEntry(instance, source, options, name))
  }

  const instance: FieryInstance = targetFactory as FieryInstance

  instance.system = system
  instance.entry = {}
  instance.entryList = []
  instance.options = {}
  instance.sources = {}
  instance.cache = {}
  instance.pager = operations.pager
  instance.more = operations.more
  instance.hasMore = operations.hasMore
  instance.refresh = operations.refresh
  instance.update = operations.update
  instance.save = operations.save
  instance.sync = operations.sync
  instance.remove = operations.remove
  instance.clear = operations.clear
  instance.getChanges = operations.getChanges
  instance.ref = operations.ref
  instance.create = operations.create
  instance.createSub = operations.createSub
  instance.build = operations.build
  instance.buildSub = operations.buildSub
  instance.entryFor = entryFor
  instance.destroy = destroy
  instance.free = free
  instance.linkSources = linkSources

  callbacks.onInstanceCreate(instance as FieryInstance)

  return instance as FieryInstance
}

function destroy(this: FieryInstance)
{
  forEach(this.options, opt => delete globalOptions.map[opt.id])
  forEach(this.cache, cached => removeCacheFromInstance(cached, this))
  forEach(this.entryList, entry => closeEntry(entry, true))

  this.entry = {}
  this.entryList = []
  this.options = {}
  this.sources = {}
  this.cache = {}

  callbacks.onInstanceDestroy(this)
}

function free (this: FieryInstance, target: FieryTarget)
{
  const entry = this.entryFor(target)

  if (entry !== null)
  {
    closeEntry(entry, true)
  }
}

function entryFor (this: FieryInstance, target: string | FieryTarget): FieryEntry | null
{
  if (isString(target))
  {
    return this.entry[ target ]
  }

  const entries = this.entryList

  for (let i = 0; i < entries.length; i++)
  {
    const entry = entries[i]

    if (entry && entry.target === target)
    {
      return entry
    }
  }

  return null
}

function linkSources (this: FieryInstance, container: any): void
{
  const entryList: (FieryEntry | null)[] = this.entryList

  for (let i = 0; i < entryList.length; i++)
  {
    const entry: FieryEntry | null = entryList[i]

    if (entry === null)
    {
      continue
    }

    const options: FieryOptions = entry.options

    if (!options.parent && !entry.name)
    {
      for (let prop in container)
      {
        if (container[prop] === entry.target)
        {
          entry.name = prop

          this.entry[ prop ] = entry
          this.sources[ prop ] = entry.source

          break
        }
      }
    }
  }
}

function buildSystem(systemOverrides?: Partial<FierySystem>): FierySystem
{
  const system = systemOverrides || {}

  for (let prop in defaultSystem)
  {
    const systemProp = prop as keyof FierySystem

    if (!(systemProp in system))
    {
      system[systemProp] = defaultSystem[systemProp]
    }
  }

  return system as FierySystem
}

const defaultSystem: FierySystem = {
  removeNamed: (_name: string) => {

  },
  setProperty: (target: any, property: string, value: any) => {
    target[property] = value
  },
  removeProperty: (target: any, property: string) => {
    delete target[property]
  },
  arrayRemove: (target: any[], index: number) => {
    target.splice(index, 1)
  },
  arrayInsert: (target: any[], index: number, value: any) => {
    target.splice(index, 0, value)
  },
  arrayMove: (target: any[], from: number, to: number, value: any) => {
    target.splice(from, 1)
    target.splice(to, 0, value)
  },
  arrayAdd: (target: any[], value: any) => {
    target.push(value)
  },
  arrayResize: (target: any[], size: number) => {
    if (target.length > size) {
      target.splice(size, target.length - size)
    }
  }
}
