'use client'

import { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileCode, Layout, RotateCcw } from 'lucide-react'
import { generateColorPalette, generateNeutrals, generateUtilityColors } from '@/lib/colors'
import type { ColorShades, NeutralColors, UtilityColors } from '@/lib/colors'

export default function ColorPalette() {
  const [primaryColor, setPrimaryColor] = useState('#ff0000')
  const [saturation, setSaturation] = useState(0)
  const [hueDegree, setHueDegree] = useState(90)
  const [colorShades, setColorShades] = useState<ColorShades>(generateColorPalette('#ff0000', 0, 90))
  const [neutrals, setNeutrals] = useState(generateNeutrals('#ff0000'))
  const [utilityColors] = useState<UtilityColors>(generateUtilityColors())

  useEffect(() => {
    const newShades = generateColorPalette(primaryColor, saturation, hueDegree)
    setColorShades(newShades)
    setNeutrals(generateNeutrals(primaryColor))
  }, [primaryColor, saturation, hueDegree])

  const handleHexInput = (value: string) => {
    // Allow partial hex inputs while typing
    if (value.startsWith('#') && value.length <= 7) {
      setPrimaryColor(value)
    }
    // Validate and set complete hex values
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setPrimaryColor(value)
    }
  }

  const ColorSwatch = ({ color, label, hexValue }: { color: string; label: string; hexValue: string }) => (
    <div className="space-y-2">
      <div
        className="h-24 w-full rounded-2xl border border-white/10"
        style={{ backgroundColor: color }}
      />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="font-mono text-white/60">{hexValue}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#121212] p-6 pb-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => handleHexInput(e.target.value)}
              className="h-16 rounded-full bg-[#2610e7] pl-16 pr-4 text-xl text-white placeholder-white/60"
              style={{ backgroundColor: colorShades.primary }}
              placeholder="Enter hex color..."
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-white/20"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ColorSwatch
              color={colorShades.primary}
              label="Primary"
              hexValue={colorShades.primary}
            />
            <ColorSwatch
              color={colorShades.primaryLight}
              label="Primary Light"
              hexValue={colorShades.primaryLight}
            />
            <ColorSwatch
              color={colorShades.primaryDark}
              label="Primary Dark"
              hexValue={colorShades.primaryDark}
            />
          </div>
        </div>

        <Card className="border-white/10 bg-white/5 p-6">
          <CardContent className="space-y-6 p-0">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Secondary</h2>
              <p className="text-white/60">Secondary brand color, used for tertiary actions.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <RotateCcw className="h-5 w-5 text-white/60" />
                <div className="flex-1">
                  <Slider
                    value={[hueDegree]}
                    onValueChange={([value]) => setHueDegree(value)}
                    min={0}
                    max={360}
                    step={1}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </div>
                <span className="min-w-[4rem] text-right font-mono text-white/60">
                  {hueDegree}°
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <ColorSwatch
                  color={colorShades.secondary}
                  label="Secondary"
                  hexValue={colorShades.secondary}
                />
                <ColorSwatch
                  color={colorShades.secondaryLight}
                  label="Secondary Light"
                  hexValue={colorShades.secondaryLight}
                />
                <ColorSwatch
                  color={colorShades.secondaryDark}
                  label="Secondary Dark"
                  hexValue={colorShades.secondaryDark}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 p-6">
          <CardContent className="space-y-6 p-0">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Neutrals</h2>
              <p className="text-white/60">System colors for backgrounds, borders, and text.</p>
            </div>

            <Tabs defaultValue="light" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="light" className="w-full">Light Mode</TabsTrigger>
                <TabsTrigger value="dark" className="w-full">Dark Mode</TabsTrigger>
              </TabsList>
              <TabsContent value="light" className="mt-4 grid gap-4 md:grid-cols-2">
                {Object.entries(neutrals.light).map(([key, color]) => (
                  <ColorSwatch
                    key={key}
                    color={color}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    hexValue={color}
                  />
                ))}
              </TabsContent>
              <TabsContent value="dark" className="mt-4 grid gap-4 md:grid-cols-2">
                {Object.entries(neutrals.dark).map(([key, color]) => (
                  <ColorSwatch
                    key={key}
                    color={color}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    hexValue={color}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 p-6">
          <CardContent className="space-y-6 p-0">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white">Utility Colors</h2>
              <p className="text-white/60">Colors that denote intention, such as success or error states.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(utilityColors).map(([key, color]) => (
                <ColorSwatch
                  key={key}
                  color={color}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  hexValue={color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Button variant="outline" className="text-white">
              <Layout className="mr-2 h-4 w-4" />
              Examples
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="text-white">
                <FileCode className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-[#2610e7] text-white hover:bg-[#2610e7]/90">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

