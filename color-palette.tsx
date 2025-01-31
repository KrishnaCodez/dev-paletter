'use client'

import { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateColorPalette, generateNeutrals, generateUtilityColors } from './utils/colors'
import type { ColorShades, NeutralColors, UtilityColors } from './utils/colors'

export default function ColorPalette() {
  const [primaryColor, setPrimaryColor] = useState('#7c3aed')
  const [saturation, setSaturation] = useState(0)
  const [colorShades, setColorShades] = useState<ColorShades>(generateColorPalette('#7c3aed'))
  const [neutrals, setNeutrals] = useState(generateNeutrals('#7c3aed'))
  const [utilityColors] = useState<UtilityColors>(generateUtilityColors())

  useEffect(() => {
    const newShades = generateColorPalette(primaryColor, saturation)
    setColorShades(newShades)
    setNeutrals(generateNeutrals(primaryColor))
  }, [primaryColor, saturation])

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <div className="space-y-1.5">
      <div
        className="h-10 w-full rounded-md border"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono">{color}</span>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Color Palette Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-4">
              <Input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Saturation Adjustment</Label>
            <Slider
              value={[saturation]}
              onValueChange={([value]) => setSaturation(value)}
              min={-100}
              max={100}
              step={1}
            />
          </div>

          <div className="grid gap-4">
            <ColorSwatch color={colorShades.primary} label="Primary" />
            <div className="grid grid-cols-3 gap-4">
              <ColorSwatch color={colorShades.primaryLight} label="Primary Light" />
              <ColorSwatch color={colorShades.primaryDark} label="Primary Dark" />
              <ColorSwatch color={colorShades.primaryContent} label="Primary Content" />
            </div>
          </div>

          <div className="grid gap-4">
            <ColorSwatch color={colorShades.secondary} label="Secondary" />
            <div className="grid grid-cols-3 gap-4">
              <ColorSwatch color={colorShades.secondaryLight} label="Secondary Light" />
              <ColorSwatch color={colorShades.secondaryDark} label="Secondary Dark" />
              <ColorSwatch color={colorShades.secondaryContent} label="Secondary Content" />
            </div>
          </div>

          <Tabs defaultValue="light">
            <TabsList>
              <TabsTrigger value="light">Light Mode</TabsTrigger>
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
            </TabsList>
            <TabsContent value="light" className="space-y-4">
              {Object.entries(neutrals.light).map(([key, color]) => (
                <ColorSwatch key={key} color={color} label={key} />
              ))}
            </TabsContent>
            <TabsContent value="dark" className="space-y-4">
              {Object.entries(neutrals.dark).map(([key, color]) => (
                <ColorSwatch key={key} color={color} label={key} />
              ))}
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Utility Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(utilityColors).map(([key, color]) => (
                <ColorSwatch key={key} color={color} label={key} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

